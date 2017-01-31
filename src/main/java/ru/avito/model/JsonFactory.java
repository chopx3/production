package ru.avito.model;

import com.google.gson.Gson;

/**
 * Created by Dmitriy on 25.01.2017.
 */
public class JsonFactory {

    public static Object toJson(Object obj){
        return new Gson().toJson(obj);
    }

    public static Object jsonToSQL(Object obj){
        return new Gson().toJson(new Gson().toJson(obj));
    }
}
