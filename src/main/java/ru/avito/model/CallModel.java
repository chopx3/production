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
    private final static Marker CALLS_PUT_SQL = MarkerManager.getMarker("CALLS_PUT_SQL");
    private final static Marker CALLS_GET_SQL = MarkerManager.getMarker("CALLS_GET_SQL");
    private final static Marker CALLS_UPDATE_SQL = MarkerManager.getMarker("CALLS_UPDATE_SQL");
    private static final int MAX_CALLS_PER_REQUEST = 20;
    /*
    * Сохраняем ссылку на звонок
     */
    public static void saveCalLink(CallRecord record) throws SQLException { // Ни где не юзается, если все ок можно выпилить.

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            debugLog(CALLS_PUT_SQL, String.format("Saving data... Hashcode #%s,\r\n data: %s", record.hashCode(), record));

            Integer user_id = DSL.using(conn).select(USERS.ID)
                    .from(USERS)
                    .where(USERS.OKTELL_LOGIN.equal(record.getOktellLogin())).fetchOne().value1();
            DSL.using(conn)
                    .insertInto(CALLS)
                    .columns(CALLS.USER_ID, CALLS.CHAIN_ID, CALLS.COM_ID,
                            CALLS.CALL_LINK, CALLS.TIME_BEGIN, CALLS.TIME_END)
                    .values(
                            user_id, record.getChainId(), record.getComId(),
                            record.getCallLink(), (record.getTimeStart() - 10800) * 1000, (record.getTimeEnd() - 10800) * 1000)
                    .execute();

            debugLog(CALLS_PUT_SQL, String.format(
                    "Data call was saved successfully!!! Hashcode: #%s \r\n Data: %s",record.hashCode(), record));
        }
    }

    public static void saveCallLink(CallRecord record, Boolean isOut)
            throws SQLException {

        try(Connection conn = DBConnection.getDataSource().getConnection()) {

            debugLog(CALLS_PUT_SQL, String.format("Saving data... Hashcode #%s,\r\n data: %s", record.hashCode(), record));

            Integer user_id = DSL.using(conn).select(USERS.ID)
                    .from(USERS)
                    .where(USERS.OKTELL_LOGIN.equal(record.getOktellLogin())).fetchOne().value1();
            DSL.using(conn)
                    .insertInto(CALLS)
                    .columns(CALLS.USER_ID, CALLS.CHAIN_ID, CALLS.COM_ID,
                            CALLS.CALL_LINK, CALLS.TIME_BEGIN, CALLS.TIME_END,
                            CALLS.IS_OUT)
                    .values(user_id, record.getChainId(), record.getComId(),
                            record.getCallLink(), (record.getTimeStart() - 10800) * 1000, (record.getTimeEnd() - 10800) * 1000,
                            isOut)
                    .execute();

            debugLog(CALLS_PUT_SQL, String.format("Data call was saved successfully!!! Hashcode: #%s\r\n Data: %s",record.hashCode(), record));
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

                debugLog(CALLS_GET_SQL, String.format(
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


            debugLog(CALLS_GET_SQL, String.format(
                    "Get empty calls for agent: %s, \r\n results: %s",
                    userId, resultAsJSON));

            return resultAsJSON;
        }
    }

    public static void updateCallRecord(UpdatedCallRecord updRecord)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {
            debugLog(CALLS_UPDATE_SQL, String.format("Updating data: %s", updRecord));
            DSLContext create = DSL.using(conn, SQLDialect.MYSQL);

            create.update(CALLS)
                    .set(CALLS.AVITO_LINK, updRecord.getAvitoUserId())
                    .set(CALLS.QUESTION_ID,updRecord.getQuestId())
                    .set(CALLS.SHOP_CATEGORY_ID, updRecord.getShopCategoryId())
                    .set(CALLS.IS_MANAGER, updRecord.isManager())
                    .where(CALLS.CHAIN_ID.eq(updRecord.getChainId()))
                    .execute();
            debugLog(CALLS_UPDATE_SQL, String.format("Update call was successfully!!! Data: %s", updRecord));

        //    selectToUpdateCallRecord(updRecord); я ваще хз зачем это написал. Получается я повторяю одно и тоже действие.
        }
    }

    public static void selectToUpdateCallRecord(UpdatedCallRecord updRecord)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            DSLContext create = DSL.using(conn, SQLDialect.MYSQL);

            Record4<Long, Integer, Integer, Boolean> results = create
                    .select(CALLS.AVITO_LINK, CALLS.QUESTION_ID,
                            CALLS.SHOP_CATEGORY_ID, CALLS.IS_MANAGER)
                    .from(CALLS)
                    .where(CALLS.CHAIN_ID.eq(updRecord.getChainId())).fetchOne();

            create.update(CALLS)
                    .set(CALLS.AVITO_LINK, results.value1())
                    .set(CALLS.QUESTION_ID, results.value2())
                    .set(CALLS.SHOP_CATEGORY_ID, results.value3())
                    .set(CALLS.IS_MANAGER, results.value4())
                    .where(CALLS.CHAIN_ID.eq(updRecord.getChainId()))
                    .execute();

            debugLog(CALLS_UPDATE_SQL, String.format("Update call was successfully!!! Data: %s", updRecord));
        }
    }

    public static String getOktellLogin(String chain_id) // Этот метод ни где не юзается. Если все будет работать можно выпилить.
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

            debugLog(CALLS_GET_SQL, String.format(
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
