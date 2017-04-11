package ru.avito.model.calls;

import ru.avito.model.tags.Tag;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Arrays;
import java.util.Set;

/**
 * Created by Dmitriy on 25.01.2017.
 */

public class FeedbackCall {

    private Integer id;

    private Integer agentId;

    private String chainId;

    private Long avitoUserId;

    private Long timeStart;

    private String type;

    private String comments;

    private Set<Tag> tags;

    public FeedbackCall() {
    }

    public FeedbackCall(Integer id, Integer agentId, String chainId, Long avitoUserId, Long timeStart, String type, String comments, Set<Tag> tags) {
        this.id = id;
        this.agentId = agentId;
        this.chainId = chainId;
        this.avitoUserId = avitoUserId;
        this.timeStart = timeStart;
        this.type = type;
        this.comments = comments;
        this.tags = tags;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAgentId() {
        return agentId;
    }

    public void setAgentId(Integer agentId) {
        this.agentId = agentId;
    }

    public String getChainId() {
        return chainId;
    }

    public void setChainId(String chainId) {
        this.chainId = chainId;
    }

    public Long getAvitoUserId() {
        return avitoUserId;
    }

    public void setAvitoUserId(Long avitoUserId) {
        this.avitoUserId = avitoUserId;
    }

    public Long getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(Long timeStart) {
        this.timeStart = timeStart;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "FeedbackCall{" +
                "id=" + id +
                ", agentId=" + agentId +
                ", chainId='" + chainId + '\'' +
                ", avitoUserId=" + avitoUserId +
                ", timeStart=" + timeStart +
                ", type='" + type + '\'' +
                ", comments='" + comments + '\'' +
                ", tags=" + tags +
                '}';
    }
}

