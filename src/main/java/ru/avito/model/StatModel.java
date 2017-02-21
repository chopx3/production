package ru.avito.model;

import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.jooq.*;
import org.jooq.impl.DSL;
import ru.avito.datasource.DBConnection;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

import static ru.avito.jooqdbmodel.Tables.*;

/**
 * Created by Dmitriy on 03.08.2016.
 */
public class StatModel {


    private final static Logger LOG = LogManager.getLogger();
    private final static Marker SQL_QUERY_STAT = MarkerManager.getMarker("SQL_QUERY_STAT");

    /**
     * Класс описывает сбор статистики по звонкам
     */

    public static String getTotalCallsByCategory(long from, long to)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            String callsByCategoryAsJSON = DSL.using(conn, SQLDialect.MYSQL)
                    .select(SHOP_CATEGORY.DESCRIPTION.as("Shop_Category"),
                            CALLS.CHAIN_ID.countDistinct().as("Calls"))
                    .from((TableLike<?>) CALLS.join(SHOP_CATEGORY))
                    .where(SHOP_CATEGORY.ID.eq(CALLS.SHOP_CATEGORY_ID))
                    .and(CALLS.TIME_BEGIN.between(from, to))
                    .and(CALLS.IS_OUT.eq(false))
                    .groupBy(CALLS.SHOP_CATEGORY_ID)
                    .orderBy(CALLS.CHAIN_ID.countDistinct().desc())
                    .fetch()
                    .formatJSON();

            debugLog(SQL_QUERY_STAT,String.format(
                    "get stat by period from %s to %s for categories, \r\n results: %s",
                    from,to,callsByCategoryAsJSON));

            return callsByCategoryAsJSON;
        }
    }

    public static String getTotalCallsByUser(long from, long to)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            DSLContext create = DSL.using(conn, SQLDialect.MYSQL);

            String callsByUserAsJSON = create
                    .select(SHOP_CATEGORY.DESCRIPTION.as("Shop_Category"),
                            CALLS.AVITO_LINK.as("User ID"),
                            CALLS.CHAIN_ID.countDistinct().as("Calls"))
                    .from((TableLike<?>) CALLS.join(SHOP_CATEGORY))
                    .where(SHOP_CATEGORY.ID.eq(CALLS.SHOP_CATEGORY_ID))
                    .and(CALLS.TIME_BEGIN.between(from, to))
                    .groupBy(CALLS.AVITO_LINK)
                    .orderBy(CALLS.CHAIN_ID.countDistinct().desc())
                    .fetch()
                    .formatJSON();

            debugLog(SQL_QUERY_STAT,String.format(
                    "get stat by period from %s to %s for users, \r\n results: %s",
                    from,to,callsByUserAsJSON));

            return callsByUserAsJSON;
        }
    }

    public static String getTotalCallsByManager(long from, long to)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            String callsByManagerAsJSON = DSL.using(conn, SQLDialect.MYSQL)
                    .select(SHOP_CATEGORY.DESCRIPTION.as("Shop_category"),
                            CALLS.CHAIN_ID.countDistinct().as("Manager_calls"))
                    .from((TableLike<?>) CALLS.join(SHOP_CATEGORY))
                    .where(SHOP_CATEGORY.ID.eq(CALLS.SHOP_CATEGORY_ID))
                    .and(CALLS.IS_MANAGER.isTrue())
                    .and(CALLS.TIME_BEGIN.between(from, to))
                    .groupBy(SHOP_CATEGORY.DESCRIPTION)
                    .orderBy(CALLS.CHAIN_ID.countDistinct().desc())
                    .fetch()
                    .formatJSON();

            debugLog(SQL_QUERY_STAT,String.format(
                    "get stat by period from %s to %s for managers, \r\n results: %s",
                    from,to,callsByManagerAsJSON));

            return callsByManagerAsJSON;
        }
    }

    public static String getTotalQuestions(Long from, Long to)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {


            String callsByQuestAsJSON = DSL.using(conn, SQLDialect.MYSQL)
                    .select(QUESTION.DESCRIPTION.as("Question"),
                            CALLS.CHAIN_ID.countDistinct().as("Calls"))
                    .from((TableLike<?>) CALLS.join(QUESTION))
                    .where(QUESTION.ID.eq(CALLS.QUESTION_ID))
                    .and(CALLS.TIME_BEGIN.between(from, to))
                    .groupBy(CALLS.QUESTION_ID)
                    .orderBy(CALLS.CHAIN_ID.countDistinct().desc())
                    .fetch()
                    .formatJSON();

            debugLog(SQL_QUERY_STAT,String.format(
                    "get stat by period from %s to %s for questions, \r\n results: %s",
                    from,to,callsByQuestAsJSON));

            return callsByQuestAsJSON;
        }
    }

    public static String getTotalOutcoming(Long from, Long to)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {


           String callsByOutcomingAsJSON = DSL.using(conn, SQLDialect.MYSQL)
                    .select(SHOP_CATEGORY.DESCRIPTION.as("Shop category"),
                            CALLS.IS_OUT.count().as("Outcoming calls"))
                    .from((TableLike<?>) CALLS.join(SHOP_CATEGORY))
                    .where(CALLS.IS_OUT.isTrue())
                    .and(CALLS.TIME_BEGIN.between(from, to))
                    .and(SHOP_CATEGORY.ID.equal(CALLS.SHOP_CATEGORY_ID))
                    .groupBy(CALLS.SHOP_CATEGORY_ID)
                    .orderBy(CALLS.IS_OUT.count().desc())
                    .fetch()
                    .formatJSON();

            debugLog(SQL_QUERY_STAT,String.format(
                    "get stat by period from %s to %s for outcoming, \r\n results: %s",
                    from,to,callsByOutcomingAsJSON));

            return callsByOutcomingAsJSON;
        }
    }

    public static String getEmptyCallsByAgent(Long from, Long to) throws SQLException {

        ArrayList<String> response = new ArrayList<>();

        try(Connection conn = DBConnection.getDataSource().getConnection()) {

            String emptyCallsAsJSON = DSL.using(conn, SQLDialect.MYSQL)
                    .select(USERS.OKTELL_LOGIN.as("Agent name"),
                            CALLS.CHAIN_ID.countDistinct().as("Empty calls"))
                    .from((TableLike<?>) CALLS.join(USERS))
                    .where(CALLS.AVITO_LINK.isNull())
                    .and(CALLS.TIME_BEGIN.between(from,to))
                    .and(CALLS.USER_ID.eq(USERS.ID))
                    .groupBy(CALLS.USER_ID)
                    .orderBy(CALLS.CHAIN_ID.countDistinct().desc())
                    .fetch()
                    .formatJSON();

            String totalCallsAsJSON = DSL.using(conn, SQLDialect.MYSQL)
                    .select(USERS.OKTELL_LOGIN.as("Agent name"),
                            CALLS.CHAIN_ID.countDistinct().as("Total calls"))
                    .from((TableLike<?>) CALLS.join(USERS))
                    .where(CALLS.TIME_BEGIN.between(from,to))
                    .and(CALLS.USER_ID.eq(USERS.ID))
                    .groupBy(CALLS.USER_ID)
                    .orderBy(CALLS.CHAIN_ID.countDistinct().desc())
                    .fetch()
                    .formatJSON();

                 response.add(emptyCallsAsJSON);
                 response.add(totalCallsAsJSON);

            debugLog(SQL_QUERY_STAT,String.format(
                    "get stat by period from %s to %s for emptycalls, \r\n results: %s",
                    from,to, response));

            return new Gson().toJson(response);
        }
    }

    private static void debugLog(Marker marker, String message) {

        if(LOG.isDebugEnabled())
            LOG.debug(marker, message);
    }
 }