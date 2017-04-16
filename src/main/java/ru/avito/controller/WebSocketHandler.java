package ru.avito.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import ru.avito.factory.CallFactory;
import ru.avito.model.calls.Call;
import ru.avito.model.calls.EmptyCall;
import ru.avito.response.EmptyCallAsJson;
import ru.avito.services.AgentService;
import ru.avito.services.CallService;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static ru.avito.model.agent.AuthorizedUsers.*;


/**
 * Created by Dmitriy on 24.12.2016.
 */

//TODO рефактроинг класса
public class WebSocketHandler extends TextWebSocketHandler{ //TODO это просто контроллер, бизнес-логику убрать

    private final static Logger LOG = LogManager.getLogger();

    @Autowired
    private AgentService agentService;

    @Autowired
    private CallService callService;

    @Autowired
    private CallFactory callFactory;


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
                Integer agentId = getAgentIdFromDb(getAgentName(session));
                List<Call> calls = callService.findByTimeStartBetweenAndAgentIdAndType(agentId, startCurrentDay()*1000, (startCurrentDay()+86400) *1000, "EMPTY");
                List<EmptyCall> emptyCalls = callFactory.getEmptyCalls(calls);
                String response = new EmptyCallAsJson(agentId,getAgentName(session),emptyCalls).toJson();
                session.sendMessage(new TextMessage(response));
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
        return agentService.findByUsername(username).getId();
    }

    private Long startCurrentDay(){
        LocalDate now = LocalDate.now();
        ZoneId zoneId = ZoneId.systemDefault();
        return now.atStartOfDay(zoneId).toEpochSecond();
    }

}
