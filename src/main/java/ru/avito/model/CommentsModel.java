package ru.avito.model;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.jooq.Record1;
import org.jooq.Record3;
import org.jooq.Result;
import org.jooq.impl.DSL;
import ru.avito.datasource.DBConnection;
import java.sql.Connection;
import java.sql.SQLException;

import static ru.avito.jooqdbmodel.Tables.COMMENTS;
import static ru.avito.jooqdbmodel.Tables.USERS;

/**
 * Created by vananos.
 */
public class CommentsModel {

    private static final int MAX_COMMENTS_PER_REQUEST = 20;
    private static final Logger LOG = LogManager.getLogger();
    private static final Marker SQL_QUERY_COMMENT = MarkerManager.getMarker("SQL_QUERY_COMMENT");


    /**
     * Класс описывает работу с комментариями на аккаунте пользователя(Avito User ID = Avito_link)
     */

    public static String getCommentsAsJSON(long link, long time)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            String commentsAsJSON = DSL.using(conn)
                    .select(COMMENTS.MESSAGE, USERS.USER_NAME, COMMENTS.TIME)
                    .from(COMMENTS, USERS)
                    .where(COMMENTS.AVITO_LINK.equal(link)
                            .and(COMMENTS.TIME.lessOrEqual(time)))
                    .and(COMMENTS.USER_ID.eq(USERS.ID)).orderBy(COMMENTS.TIME.desc())
                    .limit(MAX_COMMENTS_PER_REQUEST).fetch()
                    .formatJSON();

            debugLog(SQL_QUERY_COMMENT, String.format(
                    "Get comment list for user: %s, comment %s",
                    link, commentsAsJSON));

            return commentsAsJSON;
        }
    }

    public static boolean isCommentsExists(long userId)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            Record1<Long> result = DSL.using(conn)
                    .select(COMMENTS.AVITO_LINK).from(COMMENTS)
                    .where(COMMENTS.AVITO_LINK.equal(userId))
                    .limit(1)
                    .fetchOne();

            debugLog(SQL_QUERY_COMMENT,String.format(
                    "Is comments exists for user: %s? Result: %s",
                    userId, result!=null));

            return result != null;
        }
    }

    public static void putComment(long link, long time,
                                  String message, int author)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            DSL.using(conn)
                    .insertInto(COMMENTS)
                    .columns(COMMENTS.USER_ID, COMMENTS.TIME, COMMENTS.MESSAGE, COMMENTS.AVITO_LINK)
                    .values(author, time, message, link)
                    .execute();

            debugLog(SQL_QUERY_COMMENT,String.format(
                    "Agent %s, put comment for %s, \r\n comment: %s",
                    author, link, message));
        }
    }


    private static void debugLog(Marker marker, String message) {

        if(LOG.isDebugEnabled())
            LOG.debug(marker, message);
    }
}
