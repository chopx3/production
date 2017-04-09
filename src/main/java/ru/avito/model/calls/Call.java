package ru.avito.model.calls;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import ru.avito.model.agent.Agent;
import ru.avito.model.tags.Tag;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@Entity
@Table(name ="calls")
public class Call {

    @Id
    @Column(name = "id", updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name ="user_id", updatable = false)
    @JsonManagedReference
    private Agent agent;

    @Column(name = "type")
    private String type;

    @Column(name ="time_begin", updatable = false)
    private Long timeStart;

    @Column(name = "time_end", updatable = false)
    private Long timeEnd;


    @Column(name = "chain_id", updatable = false)
    private String chainId;

    @Column(name ="com_id", updatable = false)
    private String comId;


    @ManyToMany
    @JoinTable(name = "calls_tags", joinColumns = @JoinColumn(name = "call_id"),
    inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags;

    @Column(name ="isOut")
    private Boolean isOut;

    @Column (name = "comments")
    private String comments;

    @Column(name = "avito_link")
    private Long avitoUserId;

    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "shop_category_id")
    private Integer shopCategoryId;

    @Column(name ="isManager")
    private Boolean isManager;

    public Call() {
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    public Integer getId() {

        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public Long getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(Long timeStart) {
        this.timeStart = timeStart;
    }

    public Long getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(Long timeEnd) {
        this.timeEnd = timeEnd;
    }

    public Long getAvitoUserId() {
        return avitoUserId;
    }

    public void setAvitoUserId(Long avitoUserId) {
        this.avitoUserId = avitoUserId;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public Integer getShopCategoryId() {
        return shopCategoryId;
    }

    public void setShopCategoryId(Integer shopCategoryId) {
        this.shopCategoryId = shopCategoryId;
    }

    public String getChainId() {
        return chainId;
    }

    public void setChainId(String chainId) {
        this.chainId = chainId;
    }

    public String getComId() {
        return comId;
    }

    public void setComId(String comId) {
        this.comId = comId;
    }

    public Boolean getManager() {
        return isManager;
    }

    public void setManager(Boolean manager) {
        isManager = manager;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Boolean getOut() {
        return isOut;
    }

    public void setOut(Boolean out) {
        isOut = out;
    }

    public Call(Agent agent, String chainId, String comId, Long timeStart, Long timeEnd, Boolean isOut) {

        this.agent = agent;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.chainId = chainId;
        this.comId = comId;
        this.isOut = isOut;
        this.isManager = false;
    }

    @Override
    public String toString() {
        return "Call{" +
                "id=" + id +
                ", agent=" + agent +
                ", type='" + type + '\'' +
                ", timeStart=" + timeStart +
                ", timeEnd=" + timeEnd +
                ", chainId='" + chainId + '\'' +
                ", comId='" + comId + '\'' +
                ", tags=" + tags +
                ", isOut=" + isOut +
                ", comments='" + comments + '\'' +
                ", avitoUserId=" + avitoUserId +
                ", questionId=" + questionId +
                ", shopCategoryId=" + shopCategoryId +
                ", isManager=" + isManager +
                '}';
    }
}
