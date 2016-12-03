package ru.avito.web;



import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import ru.avito.model.AuthModel;
import ru.avito.model.CallModel;
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
    private final static Marker DATA_CALLS = MarkerManager.getMarker("DATA_CALLS");
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
        String link = getDownloadLink(com_id);
        ServerResponse response = new ServerResponse();

        this.debugLog(DATA_CALLS, String.format("Agent: %s, params:\r\n{ chain id: %s,\r\ncommutation id: %s,\r\n time start: %s,\r\n time end: %s,\r\n reason start: %s\r\n }",
                oktell_login, com_id, timeStart, timeStop, reasonStart));

        try {
            switch (reasonStart){

                case 1:
                    this.debugLog(DATA_CALLS, String.format("CASE 1, save data call for agent %s", oktell_login));
                    CallModel.saveCallLink(oktell_login, chain_id, com_id, timeStart, timeStop, link);
                    int id = AuthModel.getUserIdByOktellLogin(oktell_login);
                    this.debugLog(DATA_CALLS, String.format("CASE 1: Send message to agent %s by id %s", oktell_login, id));
                    if (id != -1) {
                        WebSocketConnections.getInstance().sendMessageToUser(id, chain_id, oktell_login);
                    }
                    break;

                case 2:
                    this.debugLog(DATA_CALLS, String.format("CASE 2 for agent %s", oktell_login));
                    Pattern p = Pattern.compile("^(4|5)\\d{3,3}$");
                    Matcher m = p.matcher(oktell_login);
                    if (m.matches()) break;
                    else {
                        try{
                            oktell_login = CallModel.getOktellLogin(chain_id);
                        }catch(Exception e){
                            LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));
                        }
                        this.debugLog(DATA_CALLS, String.format("CASE: 2 save data call for agent %s ", oktell_login));
                        CallModel.saveCallLink(oktell_login, chain_id, com_id, timeStart, timeStop, link);
                    }
                    break;

                case 3:
                    this.debugLog(DATA_CALLS, String.format(" CASE: 3 Outcoming calls from agent %s", astr));
                    CallModel.saveCallLink(astr, chain_id, com_id, timeStart, timeStop, link, true);
                    this.debugLog(DATA_CALLS, String.format("CASE: 3 Send message to agent %s", astr));
                    int ids = AuthModel.getUserIdByOktellLogin(astr);
                    if (ids != -1) {
                        WebSocketConnections.getInstance().sendMessageToUser(ids, chain_id, astr);
                    }
                    break;

                case 5:
                    Pattern pp = Pattern.compile("^(2|4|5)\\d{3,3}$");
                    Matcher mm = pp.matcher(oktell_login);
                    if (mm.matches()) break;
                    this.debugLog(DATA_CALLS, String.format(
                            "CASE: 5. Flash or hold call by agent %s with params:\r\n {chain_id: %s, com_id: %s, time: start - %s, end -%s }",
                            oktell_login, chain_id, com_id, timeStart, timeStop));
                    CallModel.saveCallLink(oktell_login, chain_id, com_id, timeStart, timeStop, link);
                    break;

                default:
                    break;
            }
        } catch (SQLException e) {

            if (e.getSQLState().contains("com_id_UQ")){
                LOG.error(SQL_EXCEPTION, String.format("Try to insert duplicate data for commutation id: %s.", com_id));
            }
            else
                LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));

            response.setStatus(ServerResponse.STATUS_ERROR);
            return response.toJson();
        }
        response.setStatus(ServerResponse.STATUS_OK);
        response.setDescription("Request has been received");

        return response.toJson();
    }

    @Override
    public void debugLog(Marker marker, String message) {
            if(LOG.isDebugEnabled())
                LOG.debug(marker, message);
    }

    public String getDownloadLink(String idconn){

        return String.format(
                "http://web_api:s7cgr3Ev@192.168.3.10:4055/download/byscript?name=Avito_get_file_by_id_conn&startparam1=%s&attachment=1", idconn);
    }

}

