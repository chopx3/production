package ru.avito.datasource;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;


/**
 * Created by vananos.
 *
 * Класс используется для получения подключений из пула
 */
public class DBConnection {
    private static final DBConnection instance = new DBConnection();
 //TODO запилить логгер
    private DataSource source;

    private DBConnection() {
        try {
            InitialContext initContext = new InitialContext();
            source = (DataSource) initContext.lookup("java:comp/env/jdbc/avito");
        } catch (NamingException e) {
            throw new RuntimeException(e);
        }
    }

    public static DBConnection getDataSource() {
        return instance;
    }

    public Connection getConnection() throws SQLException {
        return source.getConnection();
    }
}
