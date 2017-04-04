package ru.avito.response;

import com.google.gson.Gson;
import ru.avito.model.calls.Call;
import ru.avito.model.calls.EmptyCall;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

/**
 * Класс описывает ответ сервера в JSON формате
 */
public class EmptyCallAsJson {
//TODO Это класс JSON-ответа с пустыми звонками для конкретного агента. Глядя на код не понятно о чем идет речь.

    private String agentName;
    private Integer agentId;
    private List<EmptyCall> emptyCallList;
    private Long lastUpdateTimeMs;

    public EmptyCallAsJson(String agentName, int agentId) {
        this.agentName = agentName;
        this.agentId = agentId;
        this.emptyCallList = new ArrayList();
        this.lastUpdateTimeMs = LocalDateTime //TODO копипаста
                .now()
                .atZone(ZoneId.systemDefault())
                .toInstant()
                .toEpochMilli();
    }

    public EmptyCallAsJson(Integer agentId, String agentName, List<EmptyCall> emptyCallList) {
        this(agentName, agentId);
        this.setEmptyCallList(emptyCallList);
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

    public void setEmptyCallList(List<EmptyCall> emptyCallList) {
        this.emptyCallList = emptyCallList;
    }

    public EmptyCallAsJson buildEmptyCallList(List<EmptyCall> emptyCallList) {
        this.emptyCallList = emptyCallList;
        return this;
    }

    public String toJson(){
        return new Gson().toJson(this);
    }


}
