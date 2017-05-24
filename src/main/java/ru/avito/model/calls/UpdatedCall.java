package ru.avito.model.calls;


import ru.avito.model.tags.Tag;
import java.util.List;
import java.util.Set;

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

    private String comments;

    private String type;

    private Set<Tag> tags;

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

    public void setManager(Boolean manager) {
        isManager = manager;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public String getComments() {return comments; }

    public void setComments(String comments) {this.comments = comments;}

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
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
                ", comments='" + comments + '\'' +
                ", type='" + type + '\'' +
                ", tags=" + tags +
                '}';
    }


}

