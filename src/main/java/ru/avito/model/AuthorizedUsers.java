package ru.avito.model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Dmitriy on 05.01.2017.
 */
public abstract class AuthorizedUsers {

    public static Map<String, Agent> authorizedUsers = new ConcurrentHashMap<>();

}
