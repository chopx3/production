package ru.avito.model.calls;

/**
 * Created by Dmitriy on 03.12.2016.
 */
public class IncomingCall extends Call {

    private String oktellLogin, chainId, comId, aStr;
    private Long timeStart, timeEnd;
    private Integer reasonStart;
    private Boolean isManager;

    public IncomingCall(){}

    public IncomingCall(String oktellLogin, String chainId, String comId, String aStr, Long timeStart, Long timeEnd, Integer reasonStart ) {
        this.oktellLogin = oktellLogin;
        this.chainId = chainId;
        this.comId = comId;
        this.aStr = aStr;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.reasonStart = reasonStart;
        this.isManager = false;
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

    public Boolean getManager() {
        return isManager;
    }

    public void setManager(Boolean manager) {
        isManager = manager;
    }

    @Override
    public String toString() {
        return "IncomingCall{" +
                "oktellLogin='" + oktellLogin + '\'' +
                ", chainId='" + chainId + '\'' +
                ", comId='" + comId + '\'' +
                ", aStr='" + aStr + '\'' +
                ", timeStart=" + timeStart +
                ", timeEnd=" + timeEnd +
                ", reasonStart=" + reasonStart +
                ", isManager=" + isManager +
                '}';
    }
}

