package ru.avito.web;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.apache.logging.log4j.message.Message;
import ru.avito.model.CallModel;
import ru.avito.model.UpdatedCallRecord;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.*;
import java.net.URI;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

import static jdk.nashorn.internal.runtime.regexp.joni.Config.log;

/**
 * Created by vananos.
 */

@Path("call")
public class Call implements WebDebugLogger{

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

       return CallModel.getCallRecordsWithEmptyFields(userId);
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
            result = CallModel.getCallRecordsAsJson(avitoLink, time);

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

    @GET
    @Path("update")
    @Produces(MediaType.APPLICATION_JSON)
    public String setCallInfo(
              @QueryParam(value = "uChainId") String uChainId
            , @QueryParam(value = "uAvitoUserId") long avitoUserId
            , @QueryParam(value = "question") int question_id
            , @QueryParam(value = "shop_category") int shop_category_id
            , @QueryParam(value = "isManager") boolean isManager)
         {
             ServerResponse     response = new ServerResponse();
             UpdatedCallRecord updRecord = new UpdatedCallRecord(uChainId, question_id, shop_category_id, avitoUserId, isManager);

             this.debugLog(CALLS_UPDATE,String.format("Try to update calls. Data calls: %s", updRecord));

            try {
                CallModel.updateCallRecord(updRecord);

               this.debugLog(CALLS_UPDATE, String.format("Data HashCode #%s.\r\n Params: %s \r\n Update for call was successfully!!!",
                       uChainId.hashCode(), updRecord));

            } catch (SQLException e) {
                LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));

                response.setStatus(ServerResponse.STATUS_ERROR);
                response.setDescription(e.getMessage());

                return response.toJson();
            }
            response.setStatus(ServerResponse.STATUS_OK);

            return response.toJson();
        }

    @Override
    public void debugLog(Marker marker, String message) {
        if (LOG.isDebugEnabled())
            LOG.debug(marker, message);
    }
}
