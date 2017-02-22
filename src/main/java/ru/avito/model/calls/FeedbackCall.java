package ru.avito.model.calls;

import java.util.ArrayList;

/**
 * Created by Dmitriy on 25.01.2017.
 */
public class FeedbackCall {
    String agentName, com_id;
    int avitoUserId;
    long timeStart;
    String[] tags;

    public FeedbackCall(String agentname, int avitoUserId, long timeStart, String com_id, String tags ) {
        this.agentName = agentname;
        this.tags = tags.split(",");
        this.com_id = com_id;
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

    public String getCom_id() {
        return com_id;
    }

    public void setCom_id(String com_id) {
        this.com_id = com_id;
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

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("FeedbackCall{");
        sb.append("agentname='").append(agentName).append('\'');
        sb.append(", tags='").append(tags).append('\'');
        sb.append(", com_id='").append(com_id).append('\'');
        sb.append(", avitoUserId=").append(avitoUserId);
        sb.append(", timeStart=").append(timeStart);
        sb.append('}');
        return sb.toString();
    }
}
