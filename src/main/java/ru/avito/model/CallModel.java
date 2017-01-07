package ru.avito.model;

import com.google.gson.Gson;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    @Deprecated
    public static void saveCalLink(CallRecord record) throws SQLException { //TODO Ни где не юзается, если все ок можно выпилить.

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            debugLog(CALLS_PUT_SQL,
                    String.format("Saving data... Hashcode #%s,\r\n data: %s", record.hashCode(), record));

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
                    .where(USERS.OKTELL_LOGIN.equal(!isOut ? record.getOktellLogin() : record.getaStr()))
                    .fetchOne()
                    .value1();

            System.out.println(user_id);

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
    public static String getCallRecordsWithEmptyFields(int userId, String agentName)
            throws SQLException {

        LocalDate now = LocalDate.now();
        ZoneId  zoneId = ZoneId.systemDefault();
        long startDay = now.atStartOfDay(zoneId).toEpochSecond()*1000;
        long endDay = startDay+86400000;

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            Result<Record4<String, String, String, Long>> emptyCalls = DSL.using(conn)
                    .select(USERS.USER_NAME, CALLS.CHAIN_ID, CALLS.COM_ID, CALLS.TIME_BEGIN)
                    .from((TableLike<?>)CALLS.join(USERS))
                    .where(USERS.ID.equal(CALLS.USER_ID))
                    .and(CALLS.TIME_BEGIN.between(startDay, endDay))
                    .and(CALLS.USER_ID.equal(userId))
                    .and(CALLS.QUESTION_ID.isNull()
                            .or(CALLS.AVITO_LINK.isNull())
                            .or(CALLS.SHOP_CATEGORY_ID.isNull()))
                    .limit(5)
                    .fetch();

            debugLog(CALLS_GET_SQL, String.format(
                    "Get empty calls for agent: %s, \r\n results: %s",
                    userId, emptyCalls));

            List<EmptyCall> list = new ArrayList<>();
            emptyCalls.forEach(rc -> list.add(new EmptyCall(rc.value2(),rc.value3(),rc.value4())));

            return   emptyCalls.size() > 0 ?
                    new EmptyCallAsJson(emptyCalls.get(0).value1(), userId)
                            .buildEmptyCallList(list)
                            .toJson() :
                    new EmptyCallAsJson(agentName, userId).toJson();
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

        //    selectToUpdateCallRecord(updRecord); TODO я хз зачем это написал. Получается я повторяю одно и тоже действие. если все работает. Выкинуть.

        }
    }
    @Deprecated
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

    @Deprecated
    public static String getOktellLogin(String chain_id) // TODO Этот метод ни где не юзается. Если все будет работать можно выпилить.
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
