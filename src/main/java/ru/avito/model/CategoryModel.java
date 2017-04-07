package ru.avito.model;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.jooq.impl.DSL;
import ru.avito.datasource.DBConnection;
import java.sql.Connection;
import java.sql.SQLException;

import static ru.avito.jooqdbmodel.Tables.QUESTION;
import static ru.avito.jooqdbmodel.Tables.SHOP_CATEGORY;


/**
 * Created by vananos.
 */
public class CategoryModel {

        private final static Logger LOG = LogManager.getLogger();
        private final static Marker SQL_QUERY_CATEGORY= MarkerManager.getMarker("SQL_QUERY_CATEGORY");

    /**
     * Получаем список категорий
     */

    public static String getCategories()
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            String categoriesAsJASON = DSL.using(conn)
                    .select(SHOP_CATEGORY.ID, SHOP_CATEGORY.DESCRIPTION)
                    .from(SHOP_CATEGORY)
                    .fetch()
                    .formatJSON();

            debugLog(SQL_QUERY_CATEGORY,String.format(
                    "Get categories list: %s",
                    categoriesAsJASON));

            return categoriesAsJASON;
        }
    }

    /**
     * Получаем список вопросов
     */

    public static String getQuestions()
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            String questionAsJSON = DSL.using(conn)
                    .select(QUESTION.ID, QUESTION.DESCRIPTION)
                    .from(QUESTION)
                    .fetch()
                    .formatJSON();

            debugLog(SQL_QUERY_CATEGORY,String.format(
                    "Get questions list: %s",
                    questionAsJSON));

            return questionAsJSON;
        }
    }

    private static void debugLog(Marker marker, String message) {

        if(LOG.isDebugEnabled())
            LOG.debug(marker, message);
    }
}
