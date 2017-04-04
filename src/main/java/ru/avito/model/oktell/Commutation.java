package ru.avito.model.oktell;

/**
 * Created by Dmitriy on 09.03.2017.
 */
public class Commutation {

    String comId;
    long timeStart;
    long timeEnd;
    String aStr;
    String bStr;
    int reasonStart;

    public void setComId(String comId) {
        this.comId = comId;
    }

    public void setTimeStart(long timeStart) {
        this.timeStart = timeStart;
    }

    public void setTimeEnd(long timeEnd) {
        this.timeEnd = timeEnd;
    }

    public void setaStr(String aStr) {
        this.aStr = aStr;
    }

    public void setbStr(String bStr) {
        this.bStr = bStr;
    }

    public void setReasonStart(int reasonStart) {
        this.reasonStart = reasonStart;
    }


    public String getComId() {
        return comId;
    }

    public long getTimeStart() {
        return timeStart;
    }

    public long getTimeEnd() {
        return timeEnd;
    }

    public String getaStr() {
        return aStr;
    }

    public String getbStr() {
        return bStr;
    }

    public int getReasonStart() {
        return reasonStart;
    }

    @Override
    public String toString() {
        return "Commutation{" +
                "comId='" + comId + '\'' +
                ", aStr='" + aStr + '\'' +
                ", bStr='" + bStr + '\'' +
                ", timeStart=" + timeStart +
                ", timeEnd=" + timeEnd +
                ", reasonStart=" + reasonStart +
                '}';
    }
}
