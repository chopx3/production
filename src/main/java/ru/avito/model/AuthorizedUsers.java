package ru.avito.model;

import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Dmitriy on 05.01.2017.
 */
public abstract class AuthorizedUsers {

    public static Map<String, Agent> authorizedUsers = new ConcurrentHashMap<>();

    public static Map<Integer, WebSocketSession> webSocketSessions = new ConcurrentHashMap<>();

}
