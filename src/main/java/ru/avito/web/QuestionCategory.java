package ru.avito.web;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import ru.avito.model.CategoryModel;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;

/**
 * Created by vananos.
 */

@Path("qc")
public class QuestionCategory {

    private final static Logger LOG = LogManager.getLogger();
    private final static Marker SQL_EXCEPTION = MarkerManager.getMarker("SQL_EXCEPTION");
    private final static Marker QUESTIONS = MarkerManager.getMarker("QUESTIONS");
    private final static Marker CATEGORIES = MarkerManager.getMarker("CATEGORIES");

    @GET
    @Path("questions")
    @Produces(MediaType.APPLICATION_JSON)
    public String getQuestions() {
        ServerResponse response = new ServerResponse();
        try {
            String questions = CategoryModel.getQuestions();
            response.setStatus(ServerResponse.STATUS_OK);
            response.setResult(questions);

            if(LOG.isDebugEnabled())
                LOG.debug(QUESTIONS, "Get questions from DataBase. Results: " + questions);

        } catch (SQLException e) {
            LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));
            response.setStatus(ServerResponse.STATUS_ERROR);
            response.setDescription(e.getMessage());
        }
        return response.toJson();
    }

    @GET
    @Path("categories")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCategories() {
        ServerResponse response = new ServerResponse();
        try {
            String categories = CategoryModel.getCategories();
            response.setStatus(ServerResponse.STATUS_OK);
            response.setResult(categories);

            if(LOG.isDebugEnabled())
                LOG.debug(CATEGORIES, "Get categories from DataBase. Results: " + categories);

        } catch (SQLException e) {
            LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));
            response.setStatus(ServerResponse.STATUS_ERROR);
            response.setDescription(e.getMessage());
        }
        return response.toJson();
    }
}
