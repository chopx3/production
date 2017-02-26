package ru.avito.web;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import ru.avito.model.CallModel;
import ru.avito.model.calls.UpdatedCall;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.*;
import java.sql.SQLException;

import static ru.avito.model.CallModel.*;


/**
 * Created by vananos.
 */

@Path("call")
public class Calls implements WebDebugLogger{

    private final static Logger LOG = LogManager.getLogger();
    private final static Marker CALLS_UPDATE = MarkerManager.getMarker("CALLS_UPDATE");
    private final static Marker CALLS_GET = MarkerManager.getMarker("CALLS_GET");
    private final static Marker SQL_EXCEPTION = MarkerManager.getMarker("SQL_EXCEPTION");
    private final static Marker IO_EXCEPTION = MarkerManager.getMarker("IO_EXCEPTION");


    @GET
    @Path("getemptycalls")
    @Produces(MediaType.APPLICATION_JSON)
    public String getEmptyCallsByUserId(
            @QueryParam("userid") int userId)
            throws SQLException {

       return getCallRecordsWithEmptyFields(userId,null);
    }

    @GET
    @Path("getcallsforaccount")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCallsByAccount(
            @QueryParam("userid") long avitoLink,
            @QueryParam("time") long time
    ) throws SQLException {

        this.debugLog(CALLS_GET, String.format("Getting calls for account %s", avitoLink));

        String result="";
        ServerResponse response = new ServerResponse();
        try {
            result = getCallRecordsAsJson(avitoLink, time);

        } catch (SQLException e) {
            LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s",e.getMessage(), e.toString()));
            response.setStatus(ServerResponse.STATUS_ERROR);
            response.setDescription(e.getMessage());

            return response.toJson();

        } catch (IOException e) {
            LOG.error(IO_EXCEPTION,String.format("Message: %s, Descprition: %s", e.getMessage(), e.toString()));
        }

        response.setStatus(ServerResponse.STATUS_OK);
        response.setResult(result);
        return response.toJson();
    }
//http://localhost:8085/rest/call/update
    @GET
    @Path("update") //TODO Spring MVC JSON-post method
    @Produces(MediaType.APPLICATION_JSON)
    public String setCallInfo(
              @QueryParam(value = "uAgentId") int agentId
            , @QueryParam(value = "uChainId") String uChainId
            , @QueryParam(value = "uAvitoUserId") long avitoUserId
            , @QueryParam(value = "question") int question_id
            , @QueryParam(value = "shop_category") int shop_category_id
            , @QueryParam(value = "isManager") boolean isManager
            , @QueryParam(value = "tags") String tags)
         {
             ServerResponse response = new ServerResponse();

             UpdatedCall updRecord = new UpdatedCall(agentId, uChainId, question_id, shop_category_id,
                                                                    avitoUserId, isManager, tags);
             this.debugLog(CALLS_UPDATE,String.format("Try to update calls. Data calls: %s", updRecord));

            try {
                updateCallRecord(updRecord);

               this.debugLog(CALLS_UPDATE,
                       String.format("Data HashCode #%s.\r\n Params: %s \r\n Update for call was successfully!!!",
                                        uChainId.hashCode(), updRecord));
                response.setStatus(ServerResponse.STATUS_OK);
                return response.toJson();

            } catch (SQLException e) {
                LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));
                response.setStatus(ServerResponse.STATUS_ERROR);
                response.setDescription(e.getMessage());
                return response.toJson();
            } catch (NullPointerException e){
                LOG.error(SQL_EXCEPTION, String.format("Message: %s, Data: %s, ",e.getMessage(), updRecord ));
                response.setStatus(ServerResponse.STATUS_ERROR);
                response.setDescription(e.getMessage());
                return response.toJson();
            }
        }

    @GET
    @Path("feedback/put") //TODO Spring MVC JSON-post
    @Produces(MediaType.APPLICATION_JSON)
    public String putFeedback(
            @QueryParam(value = "tags") String tags
           ,@QueryParam(value = "comment") String comment
           ,@QueryParam(value = "agentId") int agentId
           ,@QueryParam(value = "chainId") String chainId) {

        try {
            return CallModel.putFeedback(tags, comment, chainId, agentId);
        } catch (SQLException e) {
            return e.toString();
        }
    }

    @GET
    @Path("feedback/all/get") //TODO Spring MVC JSON-post method
    @Produces(MediaType.APPLICATION_JSON)
    public String getFeedback(@QueryParam(value = "tags")String tags) {

        return getFeedBackByTags(tags);
    }

    @GET
    @Path("feedback/agent/get") //TODO Spring MVC JSON-post method
    @Produces(MediaType.APPLICATION_JSON)
    public String getFeedbackTaggedByAgentId(@QueryParam(value = "id")Integer agentId) {

        return getCallFeedbackTaged(agentId);
    }

    @Override
    public void debugLog(Marker marker, String message) {
        if (LOG.isDebugEnabled())
            LOG.debug(marker, message);
    }
}
