package ru.avito.model.calls;

import com.google.gson.Gson;
import org.hibernate.annotations.Formula;
import ru.avito.model.agent.Agent;

import javax.persistence.*;

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

    @Column(name ="user_id", updatable = false)
    private Integer agentId;

    @Column (name = "comments")
    private String comments;

    @Column(name ="time_begin", updatable = false)
    private Long timeStart;

    @Column(name = "time_end", updatable = false)
    private Long timeEnd;

    @Column(name = "avito_link")
    private Long avitoUserId;

    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "shop_category_id")
    private Integer shopCategoryId;

    @Column(name = "chain_id", updatable = false)
    private String chainId;

    @Column(name ="com_id", updatable = false)
    private String comId;

    @Column(name ="isManager")
    private Boolean isManager;

    @Column(name = "tags")
    private String tags;

    @Column(name ="isOut")
    private Boolean isOut;

    public Call() {
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

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Boolean getOut() {
        return isOut;
    }

    public void setOut(Boolean out) {
        isOut = out;
    }

    public Call(Integer agentId, String chainId, String comId, Long timeStart, Long timeEnd, Boolean isOut) {

        this.agentId = agentId;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.chainId = chainId;
        this.comId = comId;
        this.isOut = isOut;
        this.isManager = false;
    }


    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
