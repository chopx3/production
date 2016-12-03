package ru.avito.model;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.jooq.*;

import org.jooq.impl.DSL;
import ru.avito.datasource.DBConnection;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import static ru.avito.jooqdbmodel.Tables.CALLS;
import static ru.avito.jooqdbmodel.Tables.USERS;


/**
 * Created by vananos.
 */

public class CallModel{

    private final static Logger LOG = LogManager.getLogger();
    private final static Marker SQL_QUERY_CALLS = MarkerManager.getMarker("SQL_QUERY_CALLS");

    private static final int MAX_CALLS_PER_REQUEST = 20;
    private static final String HOST ="http:192.168.10.132:8080/callrecords/";
    private static final String USER_PASSWORD = "web_api:s7cgr3Ev";

    /*
    * Сохраняем ссылку на звонок
     */
    public static void saveCallLink(
            String oktell_login, String chain_id, String com_id,
            Long timeStart, Long timeEnd, String call_link)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            Integer user_id = DSL.using(conn).select(USERS.ID)
                    .from(USERS)
                    .where(USERS.OKTELL_LOGIN.equal(oktell_login)).fetchOne().value1();

            DSL.using(conn)
                    .insertInto(CALLS)
                    .columns(CALLS.USER_ID, CALLS.CHAIN_ID, CALLS.COM_ID,
                            CALLS.CALL_LINK, CALLS.TIME_BEGIN, CALLS.TIME_END)
                    .values(
                            user_id, chain_id, com_id,
                            call_link, (timeStart - 10800) * 1000, (timeEnd - 10800) * 1000)
                    .execute();

            debugLog(SQL_QUERY_CALLS, String.format(
                    "Data put successfuly by Agent ID %s, params {\r\n Oktell_login: %s\r\n, chain_id: %s\r\n, com_id: %s\r\n, timeStart: %s\r\n, timeEnd: %s\r\n, call_link: %s \r\n  }",
                    user_id, oktell_login, chain_id, com_id, timeStart, timeEnd, call_link));
        }
    }

    public static void saveCallLink(
            String oktell_login, String chain_id, String com_id,
            Long timeStart, Long timeEnd, String call_link, Boolean isOut)
            throws SQLException {

        try(Connection conn = DBConnection.getDataSource().getConnection()) {

            Integer user_id = DSL.using(conn).select(USERS.ID)
                    .from(USERS)
                    .where(USERS.OKTELL_LOGIN.equal(oktell_login)).fetchOne().value1();

            DSL.using(conn)
                    .insertInto(CALLS)
                    .columns(CALLS.USER_ID, CALLS.CHAIN_ID, CALLS.COM_ID,
                            CALLS.CALL_LINK, CALLS.TIME_BEGIN, CALLS.TIME_END,
                            CALLS.IS_OUT)
                    .values(user_id, chain_id, com_id,
                            call_link, (timeStart - 10800) * 1000, (timeEnd - 10800) * 1000,
                            isOut)
                    .execute();

            debugLog(SQL_QUERY_CALLS, String.format(
                    "Data put successfuly by Agent ID %s, params {\r\n Oktell_login: %s\r\n, chain_id: %s\r\n, com_id: %s\r\n, timeStart: %s\r\n, timeEnd: %s\r\n, call_link: %s\r\n, isOut: %s\r\n  }",
                    user_id, oktell_login, chain_id, com_id, timeStart, timeEnd, call_link, isOut));
        }
    }

    /*
    * Получаем записи звонков для данного пользователя
     */
    public static String getCallRecordsAsJson(long link, long time)
            throws SQLException, IOException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            String resultAsLSON = DSL.using(conn)
                    .select(CALLS.CALL_LINK, USERS.USER_NAME, CALLS.TIME_BEGIN)
                    .from(CALLS, USERS)
                    .where(CALLS.AVITO_LINK.equal(link)
                            .and(CALLS.TIME_BEGIN.lessOrEqual(time)))
                    .and(CALLS.USER_ID.eq(USERS.ID))
                    .orderBy(CALLS.TIME_BEGIN.desc())
                    .limit(MAX_CALLS_PER_REQUEST).fetch()
                    .formatJSON();

                debugLog(SQL_QUERY_CALLS, String.format(
                        "Get calls for user: %s by time: %s, \r\n results: %s",
                        link, time, resultAsLSON));

            return resultAsLSON;
        }
    }

    /*
    * Получаем записи звонков агента с незаполненными полями
     */

    public static String getCallRecordsWithEmptyFields(int userId)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            String resultAsJSON = DSL.using(conn)
                    .select(CALLS.ID, CALLS.FILE_NAME, CALLS.TIME_BEGIN)
                    .from(CALLS)
                    .where(CALLS.USER_ID.equal(userId)
                            .and(CALLS.QUESTION_ID.isNull())
                    ).fetch().formatJSON();


            debugLog(SQL_QUERY_CALLS, String.format(
                    "Get empty calls for agent: %s, \r\n results: %s",
                    userId, resultAsJSON));

            return resultAsJSON;
        }
    }

    public static void updateCallRecord(long avitoUserId, String uChainId,
                                        int question_id, int shop_category_id,
                                        boolean isManager)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            DSLContext create = DSL.using(conn, SQLDialect.MYSQL);

            create.update(CALLS)
                    .set(CALLS.AVITO_LINK, avitoUserId)
                    .set(CALLS.QUESTION_ID, question_id)
                    .set(CALLS.SHOP_CATEGORY_ID, shop_category_id)
                    .set(CALLS.IS_MANAGER, isManager)
                    .where(CALLS.CHAIN_ID.eq(uChainId))
                    .execute();

            debugLog(SQL_QUERY_CALLS, String.format(
                    "Update call by chain_id: %s for user ID: %s, \r\n params{ quest_id: %s, ShopCat_id: %s, isManager: %s",
                    uChainId, avitoUserId, question_id, shop_category_id, isManager));

            selectToUpdateCallRecord(uChainId);
        }
    }

    public static void selectToUpdateCallRecord(String chain_id)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            DSLContext create = DSL.using(conn, SQLDialect.MYSQL);

            Record4<Long, Integer, Integer, Boolean> results = create
                    .select(CALLS.AVITO_LINK, CALLS.QUESTION_ID,
                            CALLS.SHOP_CATEGORY_ID, CALLS.IS_MANAGER)
                    .from(CALLS)
                    .where(CALLS.CHAIN_ID.eq(chain_id)).fetchOne();

            create.update(CALLS)
                    .set(CALLS.AVITO_LINK, results.value1())
                    .set(CALLS.QUESTION_ID, results.value2())
                    .set(CALLS.SHOP_CATEGORY_ID, results.value3())
                    .set(CALLS.IS_MANAGER, results.value4())
                    .where(CALLS.CHAIN_ID.eq(chain_id))
                    .execute();

            debugLog(SQL_QUERY_CALLS, String.format(
                    "Update call for user ID %s, by chain_id: %s, \r\n params{ quest_id: %s, ShopCat_id: %s, isManager: %s",
                    results.value1(), chain_id, results.value2(), results.value3(), results.value4()));
        }
    }

    public static String getOktellLogin(String chain_id)
            throws SQLException, NullPointerException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            Record1<Integer> result = DSL.using(conn)
                    .select(CALLS.USER_ID)
                    .from(CALLS)
                    .where(CALLS.CHAIN_ID.equal(chain_id)).fetchOne();

            Record1<String> oktell_login = DSL.using(conn)
                    .select(USERS.OKTELL_LOGIN)
                    .from(USERS)
                    .where(USERS.ID.eq(result.value1())).fetchOne();

            debugLog(SQL_QUERY_CALLS, String.format(
                    "Get Oktell Login by chain id: %s, results: %s",
                    chain_id, oktell_login.value1()));

            return oktell_login.value1();
        }
    }

    private static void debugLog(Marker marker, String message) {

        if(LOG.isDebugEnabled())
            LOG.debug(marker, message);
    }
}
