package ru.avito.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import ru.avito.model.AuthModel;
import java.io.IOException;
import java.sql.SQLException;

import static ru.avito.model.agent.AuthorizedUsers.*;
import static ru.avito.model.CallModel.getCallRecordsWithEmptyFields;

/**
 * Created by Dmitriy on 24.12.2016.
 */
public class WebSocketHandler extends TextWebSocketHandler{ //TODO это просто контроллер, бизнес-логику убрать

    private final static Logger LOG = LogManager.getLogger();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws SQLException, IOException {
        int agentId = getAgentIdFromDb(session.getPrincipal().getName());
        if(webSocketSessions.get(agentId) != null) {
            webSocketSessions.get(agentId).close();
        }
        webSocketSessions.put(agentId, session);
        getWebSocketSession(agentId).sendMessage(new TextMessage("ok"));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        switch (message.getPayload()){
            case "getMyEmptyCalls":
                String agentUsername = getAgentName(session);
                String callRecordsWithEmptyFields =
                        getCallRecordsWithEmptyFields(authorizedUsers.get(agentUsername).getId(), agentUsername);
                session.sendMessage(new TextMessage(callRecordsWithEmptyFields));
            break;

            case "ping":
                sendPong(session);
            break;
        }
    }

    private void sendPong(WebSocketSession session) throws IOException, SQLException {
        session.sendMessage(new TextMessage("pong"));
        }

    private WebSocketSession getWebSocketSession(int agentId){ //TODO этот метод точно должен быть не тут
        return webSocketSessions.get(agentId);
    }

    private String getAgentName(WebSocketSession session) {
        return session.getPrincipal().getName();
    }

    private int getAgentIdFromDb(String username) throws SQLException {
        return AuthModel.login(username);
    }
}
