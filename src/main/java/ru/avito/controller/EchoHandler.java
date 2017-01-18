package ru.avito.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import ru.avito.model.Agent;
import ru.avito.model.CallModel;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import static ru.avito.model.AuthorizedUsers.authorizedUsers;
import static ru.avito.model.CallModel.getCallRecordsWithEmptyFields;

/**
 * Created by Dmitriy on 24.12.2016.
 */
public class EchoHandler extends TextWebSocketHandler{

    private static Map<String, WebSocketSession> sessions = new ConcurrentHashMap<String, WebSocketSession>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.putIfAbsent(session.getPrincipal().getName(), session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        System.out.println(message);
        switch (message.getPayload()){
            case "getMyEmptyCalls" :
                String agentUsername = session.getPrincipal().getName();
                System.out.println(agentUsername);

                String callRecordsWithEmptyFields =
                        getCallRecordsWithEmptyFields(authorizedUsers.get(agentUsername).getId(), agentUsername);
                System.out.println(callRecordsWithEmptyFields);
                session.sendMessage(new TextMessage(callRecordsWithEmptyFields));
                System.out.println("message send");

        }

    }
}
