package ru.avito.model.calls;

import ru.avito.factory.JsonFactory;

/**
 * Created by Dmitriy on 03.12.2016.
 */
public class UpdatedCall {

    private String  chainId;
    private int     questId, shopCategoryId, agentId;
    private long    avitoUserId;
    private boolean isManager;
    private String tags;

    public UpdatedCall() {
    }

    public UpdatedCall(int agentId, String chainId, int questId, int shopCategoryId, long avitoUserId, boolean isManager, String tags) {
        this.chainId = chainId;
        this.questId = questId;
        this.shopCategoryId = shopCategoryId;
        this.avitoUserId = avitoUserId;
        this.isManager = isManager;
        this.agentId = agentId;
        this.tags = tags;
    }

    public String getChainId() {
        return chainId;
    }

    public void setChainId(String chainId) {
        this.chainId = chainId;
    }

    public int getQuestId() {
        return questId;
    }

    public void setQuestId(int questId) {
        this.questId = questId;
    }

    public int getShopCategoryId() {
        return shopCategoryId;
    }

    public void setShopCategoryId(int shopCategoryId) {
        this.shopCategoryId = shopCategoryId;
    }

    public long getAvitoUserId() {
        return avitoUserId;
    }

    public void setAvitoUserId(long avitoUserId) {
        this.avitoUserId = avitoUserId;
    }

    public boolean isManager() {
        return isManager;
    }

    public void setManager(boolean manager) {
        isManager = manager;
    }

    public int getAgentId() {
        return agentId;
    }

    public void setAgentId(int agentId) {
        this.agentId = agentId;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public static String tagsAsJson(String tags){
        return (String) JsonFactory.jsonToSQL(tags);
    }

    @Override
    public String toString() {
        return "UpdatedCall{" +
                "chainId='" + chainId + '\'' +
                ", questId=" + questId +
                ", shopCategoryId=" + shopCategoryId +
                ", agentId=" + agentId +
                ", avitoUserId=" + avitoUserId +
                ", isManager=" + isManager +
                ", tags='" + tags + '\'' +
                '}';
    }
}

