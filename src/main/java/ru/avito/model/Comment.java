package ru.avito.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import ru.avito.model.agent.Agent;

import javax.persistence.*;

/**
 * Created by Dmitriy on 06.04.2017.
 */

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="avito_link")
    private Long avitoUserId;

    @Column(name = "time")
    private Long postTime;

    @Column(name ="message")
    private String message;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Agent agent;

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

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", avitoUserId=" + avitoUserId +
                ", postTime=" + postTime +
                ", message='" + message + '\'' +
                ", agent=" + agent +
                '}';
    }
}
