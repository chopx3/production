package ru.avito.model.calls;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Arrays;

/**
 * Created by Dmitriy on 25.01.2017.
 */

public class FeedbackCall {

    private int id;

    private int agentId;

    private String comId;

    private int avitoUserId;

    private long timeStart;

    private String type;

    private String comments;

    public FeedbackCall() {
    }

    public FeedbackCall(int id, int agentId, String comId, int avitoUserId, long timeStart, String type, String comments) {
        this.id = id;
        this.agentId = agentId;
        this.comId = comId;
        this.avitoUserId = avitoUserId;
        this.timeStart = timeStart;
        this.type = type;
        this.comments = comments;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAgentId() {
        return agentId;
    }

    public void setAgentId(int agentId) {
        this.agentId = agentId;
    }

    public String getComId() {
        return comId;
    }

    public void setComId(String comId) {
        this.comId = comId;
    }

    public int getAvitoUserId() {
        return avitoUserId;
    }

    public void setAvitoUserId(int avitoUserId) {
        this.avitoUserId = avitoUserId;
    }

    public long getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(long timeStart) {
        this.timeStart = timeStart;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "FeedbackCall{" +
                "id=" + id +
                ", agentId=" + agentId +
                ", comId='" + comId + '\'' +
                ", avitoUserId=" + avitoUserId +
                ", timeStart=" + timeStart +
                ", tags='" + type + '\'' +
                ", comments='" + comments + '\'' +
                '}';
    }
}

