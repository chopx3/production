package ru.avito.model;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.jooq.*;
import org.jooq.impl.DSL;
import ru.avito.datasource.DBConnection;
import ru.avito.response.EmptyCallAsJson;
import ru.avito.model.calls.EmptyCall;
import ru.avito.model.calls.UpdatedCall;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static ru.avito.jooqdbmodel.Tables.CALLS;
import static ru.avito.jooqdbmodel.Tables.USERS;


/**
 * Created by vananos.
 */

public class CallModel {

    private final static Logger LOG = LogManager.getLogger();
    private final static Marker CALLS_GET_SQL = MarkerManager.getMarker("CALLS_GET_SQL");
    private final static Marker CALLS_UPDATE_SQL = MarkerManager.getMarker("CALLS_UPDATE_SQL");
    private static final int MAX_CALLS_PER_REQUEST = 20; //TODO ай

    private static String selectComIdByTags = "SELECT\n" + //TODO заюзать паттерн Стратегия
            "  calls.com_id, calls.chain_id, calls.avito_link, calls.time_begin, calls.tags, calls.comments,\n" +
            "  users.user_name,\n" +
            "  shop_category.description,\n" +
            "  question.description\n" +
            "FROM calls\n" +
            "  INNER JOIN users ON users.id = calls.user_id\n" +
            "  INNER JOIN shop_category ON shop_category.id = calls.shop_category_id\n" +
            "  INNER JOIN question ON question.id = calls.question_id\n" +
            "WHERE tags REGEXP(\'%s\')";

    /*
    * Сохраняем ссылку на звонок
     */

    /*
    * Получаем записи звонков для данного пользователя
     */
    public static String getCallRecordsAsJson(long link, long time)
            throws SQLException, IOException {
        try (Connection conn = DBConnection.getDataSource().getConnection()) {
            String resultAsLSON = DSL.using(conn)
                    .select(CALLS.COM_ID, USERS.USER_NAME, CALLS.TIME_BEGIN)
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
    public static String getCallRecordsWithEmptyFields(int userId, String agentName) // TODO agentName можно получить по userId или по передаваемому объекту.
            throws SQLException {                           //TODO вообще тут бы передавать объект как параметр, а не переменные

        LocalDate now = LocalDate.now();
        ZoneId zoneId = ZoneId.systemDefault();
        long startDay = now.atStartOfDay(zoneId).toEpochSecond();
        long endDay = startDay + 86400000;

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            Result<Record4<String, String, String, Long>> emptyCalls = DSL.using(conn)
                    .select(USERS.USER_NAME, CALLS.CHAIN_ID, CALLS.COM_ID, CALLS.TIME_BEGIN)
                    .from((TableLike<?>) CALLS.join(USERS))
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
            emptyCalls.forEach(rc -> list.add(new EmptyCall(userId, rc.value2(), rc.value3(), rc.value4())));

            return createEmptyCalls(emptyCalls, userId, agentName, list);
        }
    }

    private static String createEmptyCalls(Result<Record4<String, String, String, Long>> emptyCalls, int userId, String agentName, List list) {

        return emptyCalls.size() > 0 ? //TODO обернуть в метод и заюзать JsonFactory+ и лямбду, что выше, забрать
                new EmptyCallAsJson(emptyCalls.get(0).value1(), userId)
                        .buildEmptyCallList(list)
                        .toJson() :
                new EmptyCallAsJson(agentName, userId).toJson();
    }

    public static void updateCallRecord(UpdatedCall updRecord)
            throws SQLException {  //TODO обновлять по ID
        try (Connection conn = DBConnection.getDataSource().getConnection()) {
//            debugLog(CALLS_UPDATE_SQL, String.format("Updating data: %s", updRecord));
            DSLContext create = DSL.using(conn, SQLDialect.MYSQL);

            create.update(CALLS)
                    .set(CALLS.AVITO_LINK, updRecord.getAvitoUserId())
                    .set(CALLS.QUESTION_ID, updRecord.getQuestId())
                    .set(CALLS.SHOP_CATEGORY_ID, updRecord.getShopCategoryId())
                    .set(CALLS.IS_MANAGER, updRecord.getIsManager())
                    .set(CALLS.TAGS, updRecord.getTags())
                    .where(CALLS.CHAIN_ID.eq(updRecord.getChainId()).and(CALLS.USER_ID.eq(updRecord.getAgentId())))
                    .execute();
//            debugLog(CALLS_UPDATE_SQL, String.format("Update call was successfully!!! Data: %s", updRecord));

            //    selectToUpdateCallRecord(updRecord); TODO я хз зачем это написал. Получается я повторяю одно и тоже действие. если все работает. Выкинуть.
        }
    }

    /*
    *
    * добавление тегов и комментариев по звонку
    */
    public static String putFeedback(String tags, String comment, String chainId, int agentId)
            throws SQLException {
        try (Connection conn = DBConnection.getDataSource().getConnection()) {
            DSLContext create = DSL.using(conn, SQLDialect.MYSQL);
            create.update(CALLS)
                    .set(CALLS.TAGS, tags)
                    .set(CALLS.COMMENTS, comment)
                    .where(CALLS.CHAIN_ID.eq(chainId).and(CALLS.USER_ID.eq(agentId)))
                    .execute();

            return "feedback put";
        }
    }

    /*
    * выбираем звонки из БД по указанным тегам. Работает.
    */

    public static String getFeedBackByTags(String tags){
        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            DSLContext create = DSL.using(conn, SQLDialect.MYSQL);
            LOG.debug(String.format(selectComIdByTags, tags));
            Result<Record> fetch = create.fetch(String.format(selectComIdByTags, tags));
            return fetch.formatJSON();

        } catch (SQLException e) {
            return e.toString();
        }
    }

    public static String getCallFeedbackTaged(Integer agentId) {
        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            DSLContext create = DSL.using(conn, SQLDialect.MYSQL);
            LOG.debug(String.format(selectComIdByTags, "feedback"));
            Result<Record> fetch = create.fetch(String.format(selectComIdByTags, "feedback")+
                    String.format(" and user_id=%s and comments is null", agentId));
            return fetch.formatJSON();

        } catch (SQLException e) {
            return e.toString();
        }
    }

    private static void debugLog(Marker marker, String message) { //TODO  Поправить этот копипаст, он есть в нескольких классах.
        if (LOG.isDebugEnabled()) {
            LOG.debug(marker, message);
        }
    }
}
