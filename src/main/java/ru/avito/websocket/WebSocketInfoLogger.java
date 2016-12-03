package ru.avito.websocket;

import org.apache.logging.log4j.Marker;

/**
 * Created by Dmitriy on 20.11.2016.
 */
public interface WebSocketInfoLogger {

    void infoLog(Marker marker, String message);
}
