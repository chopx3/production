package ru.avito.model;

/**
 * Created by Dmitriy on 03.12.2016.
 */
public class UpdatedCallRecord {

    private String  chainId;
    private int     questId, shopCategoryId;
    private long    avitoUserId;
    private boolean isManager;

    public UpdatedCallRecord() {
    }

    public UpdatedCallRecord(String chainId, int questId, int shopCategoryId, long avitoUserId, boolean isManager) {
        this.chainId = chainId;
        this.questId = questId;
        this.shopCategoryId = shopCategoryId;
        this.avitoUserId = avitoUserId;
        this.isManager = isManager;
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

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("UpdatedCallRecord{");
        sb.append("\r\nchainId='").append(chainId).append('\'');
        sb.append("\r\n, questId=").append(questId);
        sb.append("\r\n, shopCategoryId=").append(shopCategoryId);
        sb.append("\r\n, avitoUserId=").append(avitoUserId);
        sb.append("\r\n, isManager=").append(isManager);
        sb.append('}');
        return sb.toString();
    }
}
