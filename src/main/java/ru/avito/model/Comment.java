package ru.avito.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Dmitriy on 06.04.2017.
 */

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name="avito_link")
    private Long avitoUserId;

    @Column(name = "user_id")
    private Integer agentId;

    @Column(name = "time")
    private Long postTime;

    @Column(name ="message")
    private String message;


    public Comment() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getAvitoUserId() {
        return avitoUserId;
    }

    public void setAvitoUserId(Long avitoUserId) {
        this.avitoUserId = avitoUserId;
    }

    public Integer getAgentId() {
        return agentId;
    }

    public void setAgentId(Integer agentId) {
        this.agentId = agentId;
    }

    public Long getPostTime() {
        return postTime;
    }

    public void setPostTime(Long postTime) {
        this.postTime = postTime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
