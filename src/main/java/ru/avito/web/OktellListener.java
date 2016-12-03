package ru.avito.web;



import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import ru.avito.model.AuthModel;
import ru.avito.model.CallModel;
import ru.avito.model.CallRecord;
import ru.avito.websocket.WebSocketConnections;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by vananos.
 */

@Path("/oktell")

public class OktellListener  implements WebDebugLogger{

    private final static Logger LOG = LogManager.getLogger();
    private final static Marker CALLS_PUT = MarkerManager.getMarker("CALLS_PUT");
    private final static Marker SQL_EXCEPTION = MarkerManager.getMarker("SQL_EXCEPTION");

    @GET
    @Path("savecallrecord")
    @Produces(MediaType.TEXT_PLAIN)

    public String saveCallRecord(
            @QueryParam("Bstr") String oktell_login
            , @QueryParam("IDChain") String chain_id
            , @QueryParam("IDConn") String com_id
            , @QueryParam("TimeStart") Long timeStart
            , @QueryParam("TimeStop") Long timeStop
            , @QueryParam("Astr") String astr
            , @QueryParam("ReasonStart") Integer reasonStart
    ) {

        CallRecord record = new CallRecord(oktell_login, chain_id, com_id, astr,timeStart, timeStop, reasonStart);
        ServerResponse response = new ServerResponse();

        this.debugLog(CALLS_PUT, String.format("Incoming data call.\r\n Params: %s", record));

        try {
            switch (reasonStart){

                case 1:
                    this.debugLog(CALLS_PUT, this.logMessage(1, record));
                    CallModel.saveCallLink(record, false);
                    int id = AuthModel.getUserIdByOktellLogin(record.getOktellLogin());
                    if (id != -1) {
                        this.sendMessageToUser(id, 1, record.getOktellLogin(), record.getChainId());
                    }
                    break;

                case 2:
                    this.debugLog(CALLS_PUT, this.logMessage(2, record));
                    Pattern p = Pattern.compile("^(4|5)\\d{3,3}$");
                    Matcher m = p.matcher(oktell_login);
                    if (m.matches()) {
                        this.debugLog(CALLS_PUT, String.format("I don't want to save this datacall:\r\n %s", record));
                        break;
                    }   else {
                        this.debugLog(CALLS_PUT, this.logMessage(2, record));
                        CallModel.saveCallLink(record, false);
                    }
                    break;

                case 3:
                    this.debugLog(CALLS_PUT, this.logMessage(3, record));
                    CallModel.saveCallLink(record, true);
                    int ids = AuthModel.getUserIdByOktellLogin(astr);
                    if (ids != -1) {
                        this.sendMessageToUser(ids, 3, record.getaStr(), record.getChainId());
                    }
                    break;

                case 5:
                    Pattern pp = Pattern.compile("^(2|4|5)\\d{3,3}$");
                    Matcher mm = pp.matcher(oktell_login);
                    if (mm.matches()) break;
                    this.debugLog(CALLS_PUT, this.logMessage(5, record));
                    CallModel.saveCallLink(record, false);
                    break;

                default:
                    break;
            }
        } catch (SQLException e) {
            LOG.error(SQL_EXCEPTION, String.format("Message: %s,\r\n Cause: %s", e.getMessage(), e.getCause()));
            response.setStatus(ServerResponse.STATUS_ERROR);
            return response.toJson();
        }
        response.setStatus(ServerResponse.STATUS_OK);
        response.setDescription("Request has been received");
        return response.toJson();
    }


    private String logMessage(int caseId, CallRecord record){
        return String.format("Data HashCode: #%s,\r\n CASE %s:, try to save data call %s:\r\n", record.hashCode(), caseId, record);
    }

    private void sendMessageToUser(int userId, int caseId, String oktellLogin, String chainId){
            this.debugLog(CALLS_PUT, String.format("CASE %s: Sending message to agent %s...", caseId, oktellLogin));
            WebSocketConnections.getInstance().sendMessageToUser(userId, chainId, oktellLogin);
        }

    @Override
    public void debugLog(Marker marker, String message) {
        if(LOG.isDebugEnabled())
            LOG.debug(marker, message);
    }
}

