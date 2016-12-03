package ru.avito.web;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import ru.avito.model.AuthModel;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

/**
 * Created by vananos.
 */

@Path("auth")
public class Auth implements WebDebugLogger {

    private static final Logger LOG = LogManager.getLogger();
    private static final Marker AUTH = MarkerManager.getMarker("AUTH");
    private static final Marker SQL_EXCEPTION = MarkerManager.getMarker("SQL_EXCEPTION");

    @GET
    @Path("login")
    @Produces(MediaType.APPLICATION_JSON)
    public String login(
            @QueryParam("username") String username,
            @QueryParam("password") String password
    ) {

        ServerResponse response = new ServerResponse();
        int result;
        try {
            this.debugLog(AUTH, String.format("Get id for login %s", username));
            result = AuthModel.login(username, password);
        } catch (SQLException e) {

            LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s",e.getMessage(), e.toString()));
            response.setStatus(ServerResponse.STATUS_ERROR);
            response.setDescription(e.getMessage());

            return response.toJson();
        }
        response.setStatus(ServerResponse.STATUS_OK);
        response.setResult(result == -1 ? "fail" : String.valueOf(result));

        return response.toJson();
    }

    @Override
    public void debugLog(Marker marker, String message) {
        if(LOG.isDebugEnabled())
            LOG.debug(marker, message);
    }
}
