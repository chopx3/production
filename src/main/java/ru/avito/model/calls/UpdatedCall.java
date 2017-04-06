package ru.avito.model.calls;

import ru.avito.factory.JsonFactory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created by Dmitriy on 03.12.2016.
 */

public class UpdatedCall {

    private Integer id;

    private String chainId;

    private Integer questId;

    private Integer shopCategoryId;

    private Integer agentId;

    private Long avitoUserId;

    private Boolean isManager;

    private String type;

    public UpdatedCall() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getChainId() {
        return chainId;
    }

    public void setChainId(String chainId) {
        this.chainId = chainId;
    }

    public Integer getQuestId() {
        return questId;
    }

    public void setQuestId(Integer questId) {
        this.questId = questId;
    }

    public Integer getShopCategoryId() {
        return shopCategoryId;
    }

    public void setShopCategoryId(Integer shopCategoryId) {
        this.shopCategoryId = shopCategoryId;
    }

    public Integer getAgentId() {
        return agentId;
    }

    public void setAgentId(Integer agentId) {
        this.agentId = agentId;
    }

    public Long getAvitoUserId() {
        return avitoUserId;
    }

    public void setAvitoUserId(Long avitoUserId) {
        this.avitoUserId = avitoUserId;
    }

    public Boolean getIsManager() {
        return isManager;
    }

    public void setIsManager(Boolean manager) {
        isManager = manager;
    }

    public String getTags() {
        return type;
    }

    public void setTags(String tags) {
        this.type = tags;
    }

    @Override
    public String toString() {
        return "UpdatedCall{" +
                "id=" + id +
                ", chainId='" + chainId + '\'' +
                ", questId=" + questId +
                ", shopCategoryId=" + shopCategoryId +
                ", agentId=" + agentId +
                ", avitoUserId=" + avitoUserId +
                ", isManager=" + isManager +
                ", type='" + type + '\'' +
                '}';
    }
}

