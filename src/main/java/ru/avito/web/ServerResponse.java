package ru.avito.web;

import com.google.gson.Gson;

/**
 * Created by vananos.
 */

public class ServerResponse {

    public static final String STATUS_OK = "ok";
    public static final String STATUS_ERROR = "error";

    private String status;
    private String result;
    private String description;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String toJson() {
        return new Gson().toJson(this);
    }
}