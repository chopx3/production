package ru.avito.web;

/**
 * Created by Dmitriy on 03.12.2016.
 */
public class CallRecord {

    private String oktellLogin, chainId, comId, aStr;
    private Long timeStart, timeEnd;
    private Integer reasonStart;

    public CallRecord(){}

    public CallRecord(String oktellLogin, String chainId, String comId, String aStr, Long timeStart, Long timeEnd, Integer reasonStart) {
        this.oktellLogin = oktellLogin;
        this.chainId = chainId;
        this.comId = comId;
        this.aStr = aStr;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.reasonStart = reasonStart;
    }

    public String getOktellLogin() {
        return oktellLogin;
    }

    public void setOktellLogin(String oktellLogin) {
        this.oktellLogin = oktellLogin;
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

    public String getaStr() {
        return aStr;
    }

    public void setaStr(String aStr) {
        this.aStr = aStr;
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

    public Integer getReasonStart() {
        return reasonStart;
    }

    public void setReasonStart(Integer reasonStart) {
        this.reasonStart = reasonStart;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("CallRecord{");
        sb.append("oktellLogin='").append(oktellLogin).append('\'');
        sb.append(", chainId='").append(chainId).append('\'');
        sb.append(", comId='").append(comId).append('\'');
        sb.append(", aStr='").append(aStr).append('\'');
        sb.append(", timeStart=").append(timeStart);
        sb.append(", timeEnd=").append(timeEnd);
        sb.append(", reasonStart=").append(reasonStart);
        sb.append('}');
        return sb.toString();
    }
}
