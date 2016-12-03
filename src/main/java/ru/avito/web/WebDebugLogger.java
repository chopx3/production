package ru.avito.web;

import org.apache.logging.log4j.Marker;

/**
 * Created by Dmitriy on 20.11.2016.
 */
interface WebDebugLogger {

    void debugLog(Marker marker, String message);
}
