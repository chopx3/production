package ru.avito.model.calls;

import java.util.Arrays;

/**
 * Created by Dmitriy on 25.01.2017.
 */
public class FeedbackCall {
    String agentName, comId;
    int avitoUserId;
    long timeStart;
    String[] tags;

    public FeedbackCall(String agentname, int avitoUserId, long timeStart, String comId, String tags ) {
        this.agentName = agentname;
        this.tags = tags.split(",");
        this.comId = comId;
        this.avitoUserId = avitoUserId;
        this.timeStart = timeStart;
    }

    public String getAgentname() {
        return agentName;
    }

    public void setAgentname(String agentname) {
        this.agentName = agentname;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags.split(",");
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

    public Long getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(long timeStart) {
        this.timeStart = timeStart;
    }

    @Override
    public String toString() {
        return "FeedbackCall{" +
                "agentName='" + agentName + '\'' +
                ", comId='" + comId + '\'' +
                ", avitoUserId=" + avitoUserId +
                ", timeStart=" + timeStart +
                ", tags=" + Arrays.toString(tags) +
                '}';
    }
}
