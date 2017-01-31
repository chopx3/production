package ru.avito.controller;


import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import ru.avito.model.AuthModel;
import ru.avito.model.AuthorizedUsers;

import java.io.IOException;
import java.sql.SQLException;

import static ru.avito.model.AuthorizedUsers.authorizedUsers;
import static ru.avito.model.CallModel.getCallRecordsWithEmptyFields;

/**
 * Created by Dmitriy on 24.12.2016.
 */
public class EchoHandler extends TextWebSocketHandler{

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws SQLException {
        int userId = AuthModel.login(session.getPrincipal().getName());
        AuthorizedUsers.webSocketSessions.putIfAbsent(userId, session);
       // sendPong(session);
        //баг
        //1. запустили приложение 2. залогинились 3. убедились, что авторефреш работает 4. очистили кэш в бразуере
        //5. авторефреш сломался.
        //вернуть пинг-понг и проверить все ли ок

    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        switch (message.getPayload()){
            case "getMyEmptyCalls":
                String agentUsername = session.getPrincipal().getName();
                System.out.println(agentUsername);
                String callRecordsWithEmptyFields =
                        getCallRecordsWithEmptyFields(authorizedUsers.get(agentUsername).getId(), agentUsername);
                session.sendMessage(new TextMessage(callRecordsWithEmptyFields));
            break;

            case "ping":
                sendPong(session);
            break;
        }
    }

    private static void sendPong(WebSocketSession session) {
        try {
            session.sendMessage(new TextMessage("pong"));
            System.out.println("pong");
        } catch (IOException e) {
            System.out.println(e.getCause());
        }
    }
}
