//package ru.avito.web;
//
//import org.apache.logging.log4j.LogManager;
//import org.apache.logging.log4j.Logger;
//import org.apache.logging.log4j.Marker;
//import org.apache.logging.log4j.MarkerManager;
//import org.springframework.web.socket.TextMessage;
//import ru.avito.factory.CallFactory;
//import ru.avito.model.AuthModel;
//import ru.avito.model.CallModel;
//import ru.avito.model.calls.Call;
//import ru.avito.websocket.WebSocketConnections;
//import javax.ws.rs.GET;
//import javax.ws.rs.Path;
//import javax.ws.rs.Produces;
//import javax.ws.rs.QueryParam;
//import javax.ws.rs.core.MediaType;
//import java.sql.SQLException;
//import java.util.regex.Matcher;
//import java.util.regex.Pattern;
//
//import static ru.avito.model.agent.AuthorizedUsers.webSocketSessions;

/**
 * Created by vananos.
 */
//
//@Path("/oktell")
//
//public class OktellListener  implements WebDebugLogger{
//
//    private final static Logger LOG = LogManager.getLogger();
//    private final static Marker CALLS_PUT = MarkerManager.getMarker("CALLS_PUT");
//    private final static Marker SQL_EXCEPTION = MarkerManager.getMarker("SQL_EXCEPTION");
////    private static CallFactory<Call> callFactory;
//
//    @GET
//    @Path("savecallrecord")
//    @Produces(MediaType.TEXT_PLAIN)

//    public String saveCallRecord( // TODO не надо так...
//              @QueryParam("Bstr") String oktell_login
//            , @QueryParam("IDChain") String chain_id
//            , @QueryParam("IDConn") String com_id
//            , @QueryParam("TimeStart") Long timeStart
//            , @QueryParam("TimeStop") Long timeStop
//            , @QueryParam("Astr") String astr
//            , @QueryParam("ReasonStart") Integer reasonStart
//    ) {
//
////        Call call = new Call(oktell_login, chain_id, com_id, astr, timeStart, timeStop, reasonStart);
//
//        //Call call = callFactory.getInstance(record); //TODO сюда приходит звонок
//
//        ServerResponse response = new ServerResponse();
//
//        LOG.info(CALLS_PUT, String.format("Incoming data call.\r\n Params: %s", call));
//
//        try {
//            switch (reasonStart){ //TODO тут тоже бы что-то сделать...
//
//                case 1:
//                    this.debugLog(CALLS_PUT, this.logMessage(1, call));
//                    CallModel.saveCallLink(call, false);
//                    int id = AuthModel.getUserIdByOktellLogin(call.getOktellLogin());
//                    if (id != -1) {
//                        this.sendMessageToUser(id, 1, call.getOktellLogin(), call.getChainId());
//                    }
//                    break;
//
//                case 2:
//                    this.debugLog(CALLS_PUT, this.logMessage(2, call));
//                    Pattern p = Pattern.compile("^(4|5)\\d{3,3}$");
//                    Matcher m = p.matcher(oktell_login);
//                    if (m.matches()) {
//                        this.debugLog(CALLS_PUT, String.format("I don't want to save this datacall:\r\n %s", call));
//                        break;
//                    }   else {
//                        this.debugLog(CALLS_PUT, this.logMessage(2, call));
//                        CallModel.saveCallLink(call, false);
//                    }
//                    break;
//
//                case 3:
//                    this.debugLog(CALLS_PUT, this.logMessage(3, call));
//                    CallModel.saveCallLink(call, true);
//                    int ids = AuthModel.getUserIdByOktellLogin(astr);
//                    if (ids != -1) {
//                        this.sendMessageToUser(ids, 3, call.getaStr(), call.getChainId());
//                    }
//                    break;
//
//                case 5:
//                    Pattern pp = Pattern.compile("^(2|4|5)\\d{3,3}$");
//                    Matcher mm = pp.matcher(oktell_login);
//                    if (mm.matches()) break;
//                    this.debugLog(CALLS_PUT, this.logMessage(5, call));
//                    CallModel.saveCallLink(call, false);
//                    break;
//
//                default:
//                    break;
//            }
//        } catch (SQLException e) {
//            LOG.error(SQL_EXCEPTION, String.format("Message: %s,\r\n Cause: %s", e.getMessage(), e.getCause()));
//            response.setStatus(ServerResponse.STATUS_ERROR);
//            return response.toJson();
//        }
//        response.setStatus(ServerResponse.STATUS_OK);
//        response.setDescription("Request has been received");
//        return response.toJson();
//    }


//    private String logMessage(int caseId, Call call){ // TODO используется в кейсах. Может можно сделать лучше?
//        return String.format("Data HashCode: #%s,\r\n CASE %s:, try to save data call %s:\r\n",
//                                call.hashCode(), caseId, call);
//    }

//    private void sendMessageToUser(int userId, int caseId, String oktellLogin, String chainId){
//
//            this.debugLog(CALLS_PUT, String.format("CASE %s: Sending message to agent %s...", caseId, oktellLogin));
//            WebSocketConnections.getInstance().sendMessageToUser(userId, chainId, oktellLogin);
//        try {
//            LOG.debug(webSocketSessions);
//            LOG.debug(webSocketSessions.get(userId));
//            webSocketSessions.get(userId).sendMessage(new TextMessage("Exist empty calls"));
//
//        } catch (Exception e) {
//            LOG.debug(e.getMessage());
//            LOG.debug(e.getCause());
//        }
//    }
//
//    @Override
//    public void debugLog(Marker marker, String message) { //TODO копипаста во всех DAO-классах где есть статик методы
//        if(LOG.isDebugEnabled())
//            LOG.debug(marker, message);
//    }
//}

