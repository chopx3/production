package ru.avito.model.agent;

import org.springframework.web.socket.WebSocketSession;
import ru.avito.model.agent.Agent;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Dmitriy on 05.01.2017.
 */
public abstract class AuthorizedUsers {

    public static Map<String, Agent> authorizedUsers = new ConcurrentHashMap<>();

    public static Map<Integer, WebSocketSession> webSocketSessions = new ConcurrentHashMap<>();

}
