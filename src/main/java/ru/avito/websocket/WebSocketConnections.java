package ru.avito.websocket;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import ru.avito.model.AuthModel;
import ru.avito.web.ServerResponse;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.*;
import java.sql.SQLException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Created by vananos.
 */

@ServerEndpoint(value = "/websocket/connect")
public class WebSocketConnections implements WebSocketInfoLogger{

    private static Logger LOG = LogManager.getLogger();
    private static final WebSocketConnections instance = new WebSocketConnections();

    private final static Marker SESSION_POOL = MarkerManager.getMarker("SESSION_POOL");
    private final static Marker SESSION_POOL_LOGIN = MarkerManager.getMarker("SESSION_POOL_LOGIN").addParents(SESSION_POOL);
    private final static Marker SESSION_POOL_LOGOUT = MarkerManager.getMarker("SESSION_POOL_LOGOUT").addParents(SESSION_POOL);
    private final static Marker SESSION_POOL_UNLOGIN = MarkerManager.getMarker("SESSION_POOL_UNLOGIN").addParents(SESSION_POOL);
    private final static Marker IO_EXCEPTION = MarkerManager.getMarker("IO_EXCEPTION");
    private final static Marker SQL_EXCEPTION = MarkerManager.getMarker("SQL_EXCEPTION");


    private static ConcurrentMap<Integer, Session> sessions = new ConcurrentHashMap<Integer, Session>();

    public WebSocketConnections() {
    }

    public static WebSocketConnections getInstance() {
        return instance;
    }

    @OnOpen
    public void onOpen(Session session) {
        try {
            ServerResponse response = new ServerResponse();
            response.setStatus(Response.GET_ID.toString());
            session.getBasicRemote().sendText(response.toJson());

        } catch (IOException e) {
            LOG.error(IO_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) {

        try {
            ServerResponse response = new ServerResponse();
            int userId = Integer.parseInt(message);

            if (AuthModel.isUserExist(userId)) {
                sessions.put(userId, session);

                LOG.info(SESSION_POOL_LOGIN, String.format("Session %s for user %s was created.\r\n Session pool size: %s. Session list: %s",
                           session.getId(), userId, sessions.size(), sessions.toString()));

                response.setStatus(Response.OK.toString());
                session.getBasicRemote().sendText(response.toJson());

         } else {
                LOG.warn(SESSION_POOL, String.format("User with id %s, does not exist. Please check database", userId));
                response.setStatus(Response.AUTH_FAIL.toString());
                session.getBasicRemote().sendText(response.toJson());
            }
        }  catch (SQLException e) {
            LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));
        } catch (IOException e) {
            LOG.error(IO_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));
        }
    }

    @OnClose
    public void onClose(Session session) {

        for (Integer i : sessions.keySet()) {
            Session s = sessions.get(i);
            if (session.equals(s)) {
                sessions.remove(i);
            }
        }
        LOG.info(SESSION_POOL_LOGOUT, String.format("Session %s was close. Pool size: %s, Sessions: %s",
                session.getId(), sessions.size(), sessions.toString()));
    }

    public void sendMessageToUser(int userId, String msg, String oktell_login) {
        try {
            if (sessions.containsKey(userId)) {
                Session session = sessions.get(userId);
                ServerResponse response = new ServerResponse();
                response.setStatus(Response.MSG.toString());
                response.setResult(msg);
                session.getBasicRemote().sendText(response.toJson());

            } else
                LOG.warn(SESSION_POOL_UNLOGIN, String.format("AGENT %S (id: %s) IS NOT LOGGED EXTENSION!!!",
                        oktell_login, userId));
        }
        catch (IOException e) {
            LOG.error(IO_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));
        }
    }

    @Override
    public void infoLog(Marker marker, String message) {

        if(LOG.isInfoEnabled())
            LOG.info(marker, message);
    }
}


enum Response {
    GET_ID("get id"),
    OK("ok"),
    AUTH_FAIL("unknown user"),
    MSG("msg");

    private String status;

    Response(String status) {
        this.status = status;
    }

    public String toString() {
        return status;
    }
}