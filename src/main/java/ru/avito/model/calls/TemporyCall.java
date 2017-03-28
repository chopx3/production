package ru.avito.model.calls;

import javax.persistence.*;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public class TemporyCall {

        private Long timeStart;
        private Long timeEnd;
        private String chainId;
        private String comId;
        private transient String aStr;
        private transient String bStr;
        private transient Integer reasonStart;

    public TemporyCall() {
    }
    public TemporyCall(Long timeStart, Long timeEnd, String chainId, String comId, String bStr, String aStr, Integer reasonStart) {
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.chainId = chainId;
        this.comId = comId;
        this.aStr = aStr;
        this.bStr = bStr;
        this.reasonStart = reasonStart;
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

    public String getbStr() {
        return bStr;
    }

    public void setbStr(String bStr) {
        this.bStr = bStr;
    }

    public Integer getReasonStart() {
        return reasonStart;
    }

    public void setReasonStart(Integer reasonStart) {
        this.reasonStart = reasonStart;
    }

    @Override
    public String toString() {
        return "TemporyCall{" +
                "timeStart=" + timeStart +
                ", timeEnd=" + timeEnd +
                ", chainId='" + chainId + '\'' +
                ", comId='" + comId + '\'' +
                ", aStr='" + aStr + '\'' +
                ", bStr='" + bStr + '\'' +
                ", reasonStart=" + reasonStart +
                '}';
    }
}
