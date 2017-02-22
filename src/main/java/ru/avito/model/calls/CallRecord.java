package ru.avito.model.calls;

/**
 * Created by Dmitriy on 03.12.2016.
 */
public class CallRecord {

    private String oktellLogin, chainId, comId, aStr;
    private Long timeStart, timeEnd;
    private Integer reasonStart;
    private Boolean isManager;
    private String callLink;

    public CallRecord(){}

    public CallRecord(String oktellLogin, String chainId, String comId, String aStr, Long timeStart, Long timeEnd, Integer reasonStart ) {
        this.oktellLogin = oktellLogin;
        this.chainId = chainId;
        this.comId = comId;
        this.aStr = aStr;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.reasonStart = reasonStart;
        this.isManager = false;
        this.callLink = String.format(
                "http://web_api:s7cgr3Ev@192.168.3.10:4055/download/byscript?name=Avito_get_file_by_id_conn&startparam1=%s&attachment=1", comId);
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

    public String getCallLink() {
        return callLink;
    }
    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("\r\nCallRecord{");
        sb.append("\r\noktellLogin='").append(oktellLogin).append('\'');
        sb.append("\r\n, chainId='").append(chainId).append('\'');
        sb.append("\r\n, comId='").append(comId).append('\'');
        sb.append("\r\n, aStr='").append(aStr).append('\'');
        sb.append("\r\n, timeStart=").append(timeStart);
        sb.append("\r\n, timeEnd=").append(timeEnd);
        sb.append("\r\n, reasonStart=").append(reasonStart);
        sb.append("\r\n, isManager=").append(isManager);
        sb.append('}');
        return sb.toString();
    }
}
