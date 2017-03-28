package ru.avito.model.calls;

import javax.persistence.*;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@Entity
@Table(name ="calls")
public class Call {  //TODO надо подумать над иерархией сущностей звонков. Сделать UnUpdatable аннотацию.

    @Id
    @Column(name = "id", updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name ="user_id", updatable = false)
    private int userId;

    @Column(name ="time_begin", updatable = false)
    private Long timeStart;

    @Column(name = "time_end", updatable = false)
    private Long timeEnd;

    @Column(name = "chain_id", updatable = false)
    private String chainId;

    @Column(name ="com_id", updatable = false)
    private String comId;

    @Column(name ="isManager")
    private boolean isManager;

    private transient String aStr;
    private transient String bStr;
    private transient Integer reasonStart;

    public Call() {
    }

    public Call(String bStr, String chainId, String comId, String aStr, Long timeStart, Long timeEnd, Integer reasonStart) {
        this.bStr = bStr;
        this.chainId = chainId;
        this.comId = comId;
        this.aStr = aStr;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.reasonStart = reasonStart;
        this.isManager = false;
        this.userId = 30; //TODO убрать хардкод

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOktellLogin() {
        return bStr;
    }

    public void setOktellLogin(String oktellLogin) {
        this.bStr = oktellLogin;
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

    public void setManager(boolean manager) {
        isManager = manager;
    }

    public boolean isManager() {
        return isManager;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Call{" +
                "id=" + id +
                ", userId=" + userId +
                ", timeStart=" + timeStart +
                ", timeEnd=" + timeEnd +
                ", chainId='" + chainId + '\'' +
                ", comId='" + comId + '\'' +
                ", isManager=" + isManager +
                ", aStr='" + aStr + '\'' +
                ", oktellLogin='" + bStr + '\'' +
                ", reasonStart=" + reasonStart +
                '}';
    }
}
