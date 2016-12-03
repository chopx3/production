package ru.avito.web;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.apache.logging.log4j.message.Message;
import ru.avito.model.CommentsModel;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

/**
 * Created by vananos.
 */

@Path("/comment")

public class Comment implements WebDebugLogger{

    private final static Logger LOG = LogManager.getLogger();
    private final static Marker CHECK_COMMENT = MarkerManager.getMarker("CHECK_COMMENT");
    private final static Marker GET_COMMENT = MarkerManager.getMarker("GET_COMMENT");
    private final static Marker PUT_COMMENT = MarkerManager.getMarker("PUT_COMMENT");
    private final static Marker SQL_EXCEPTION = MarkerManager.getMarker("SQL_EXCEPTION");


    @GET
    @Path("exists")
    @Produces(MediaType.APPLICATION_JSON)
    public String exists(
            @QueryParam("userid") long userId
    ) throws SQLException {
        String result;
        ServerResponse response = new ServerResponse();
        try {
            this.debugLog(CHECK_COMMENT, String.format("Check comments for user: %s",userId));
            result = Boolean.toString(CommentsModel.isCommentsExists(userId));

        } catch (SQLException e) {
            LOG.error(SQL_EXCEPTION, String.format("Message %s, Description: %s",e.getMessage(), e.toString()));
            response.setStatus(ServerResponse.STATUS_ERROR);
            response.setDescription(e.getMessage());
            return response.toJson();
        }

        response.setStatus(ServerResponse.STATUS_OK);
        response.setResult(result);
        return response.toJson();
    }

    @GET
    @Path("get")
    @Produces(MediaType.APPLICATION_JSON)
    public String getComment(
            @QueryParam("userid") long userId
            , @QueryParam("time") long time
    ) throws SQLException {
        String result;
        ServerResponse response = new ServerResponse();
        try {
            this.debugLog(GET_COMMENT, String.format("Get comments for user: %s", userId));
            result = CommentsModel.getCommentsAsJSON(userId, time);

        } catch (SQLException e) {
            LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));

            response.setStatus(ServerResponse.STATUS_ERROR);
            response.setDescription(e.getMessage());

            return response.toJson();
        }
        response.setStatus(ServerResponse.STATUS_OK);
        response.setResult(result);

        return response.toJson();
    }

    @POST
    @Path("put")
    @Produces(MediaType.APPLICATION_JSON)
    public String putComment(
            @FormParam(value = "userid") long userId
            , @FormParam(value = "time") long time
            , @FormParam(value = "message") String message
            , @FormParam(value = "author") int author
    ) {
        ServerResponse response = new ServerResponse();
        try {
            this.debugLog(PUT_COMMENT, String.format("Comment %s, \r\n time: %s, for User: %s,  putting by %s", message, time, userId, author));
            CommentsModel.putComment(userId, time, message, author);

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



