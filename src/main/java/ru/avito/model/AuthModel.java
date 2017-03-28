package ru.avito.model;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.jooq.Record1;
import org.jooq.impl.DSL;
import ru.avito.datasource.DBConnection;

import java.sql.Connection;
import java.sql.SQLException;

import static ru.avito.jooqdbmodel.Tables.USERS;

/**
 * Created by vananos.
 * <p>
 * Модель авторизации
 */
public class AuthModel {

    private final static Logger LOG = LogManager.getLogger();
    private final static Marker SQL_QUERY_AUTH=MarkerManager.getMarker("SQL_QUERY_AUTH");

    /*
    *Обращаемся к базе и проверяем есть ли пользователь с заданным логином и паролем
     */
    public static int login(String username)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            Record1<Integer> result = DSL.using(conn)
                    .select(USERS.ID)
                    .from(USERS)
                    .where(USERS.USER_NAME.eq(username))
                    .fetchOne();

            //debugLog(SQL_QUERY_AUTH,String.format("Is user exist: %s. Results %s", username, result));

            return result == null ? -1 : result.value1();
        }
    }

    /*
    * Существует ли пользователь с заданным id
     */
    public static boolean isUserExist(int userId)
            throws SQLException {

        try (Connection conn = DBConnection.getDataSource().getConnection()) {
            Record1<Integer> result = DSL.using(conn)
                    .select(USERS.ID)
                    .from(USERS)
                    .where(USERS.ID.eq(userId))
                    .fetchOne();

            debugLog(SQL_QUERY_AUTH,String.format("Is user exist with id: %s. Results %s", userId, result));

            return result != null;
        }
    }

    /*
    * Получаем id пользователя с заданным логином Oktell
     */

    public static int getUserIdByOktellLogin(String oktellLogin)
            throws SQLException {
            debugLog(SQL_QUERY_AUTH,String.format("Getting agent ID by Oktell login: %s", oktellLogin));
        try (Connection conn = DBConnection.getDataSource().getConnection()) {

            Record1<Integer> result = DSL.using(conn)
                    .select(USERS.ID)
                    .from(USERS)
                    .where(USERS.OKTELL_LOGIN.eq(oktellLogin))
                    .fetchOne();

            debugLog(SQL_QUERY_AUTH,String.format("Is user exist with Oktell login: %s. Results(id) %s", oktellLogin, result.value1()));

            return result == null ? -1 : result.value1();
        }
    }

        private static void debugLog(Marker marker, String message) {
        if(LOG.isDebugEnabled())
            LOG.debug(marker, message);
    }
}