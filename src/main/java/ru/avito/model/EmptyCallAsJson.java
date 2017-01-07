package ru.avito.model;

import com.google.gson.Gson;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

/**
 * Класс описывает ответ сервера в JSON формате
 */
public class EmptyCallAsJson {

    private String agentName;
    private int agentId;
    private List<EmptyCall> emptyCallList = new ArrayList<>();
    private long lastUpdateTimeMs;

    public EmptyCallAsJson(String agentName, int agentId) {
        this.agentName = agentName;
        this.agentId = agentId;
        this.lastUpdateTimeMs = LocalDateTime
                .now()
                .atZone(ZoneId.systemDefault())
                .toInstant()
                .toEpochMilli();
    }

    public String getAgentName() {
        return agentName;
    }

    public int getAgentId() {
        return agentId;
    }

    public List<EmptyCall> getEmptyCallList() {
        return emptyCallList;
    }

    public long getLastUpdateTimeMs() {
        return lastUpdateTimeMs;
    }

    public EmptyCallAsJson buildEmptyCallList(List<EmptyCall> emptyCallList) {
        this.emptyCallList = emptyCallList;
        return this;
    }

    public String toJson(){
        return new Gson().toJson(this);
    }


}
