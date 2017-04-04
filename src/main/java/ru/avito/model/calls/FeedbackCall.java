package ru.avito.model.calls;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Arrays;

/**
 * Created by Dmitriy on 25.01.2017.
 */

@Entity
@Table(name = "calls")
public class FeedbackCall {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "user_id")
    private int agentId;

    @Column(name ="com_id")
    private String comId;

    @Column(name = "avito_link")
    private int avitoUserId;

    @Column(name = "time_begin")
    private long timeStart;

    @Column(name = "tags")
    private String tags;

    @Column (name = "comments")
    private String comments;

    public FeedbackCall() {
    }

    public FeedbackCall(int id, int agentId, String comId, int avitoUserId, long timeStart, String tags, String comments) {
        this.id = id;
        this.agentId = agentId;
        this.comId = comId;
        this.avitoUserId = avitoUserId;
        this.timeStart = timeStart;
        this.tags = tags;
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

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
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
                ", tags='" + tags + '\'' +
                ", comments='" + comments + '\'' +
                '}';
    }
}

