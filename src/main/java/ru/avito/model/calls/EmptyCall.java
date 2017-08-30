package ru.avito.model.calls;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * Класс описывает объект звонка с незаполненными полями. Объект используется для отправки на клиент.
 */ //TODO поменять JSON на клиенте т.к. сейчас обновление по ID звонка

public class EmptyCall {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "chain_id")
    private String chainId;

    @Column(name = "com_id")
    private String comId;

    @Column(name ="time_begin")
    private Long timeStart;

    @Column(name ="time_end")
    private Long timeEnd;

    public EmptyCall() {
    }

    public EmptyCall(int id, String chainId, String comId, Long timeStart, Long timeEnd) {
        this.id = id;
        this.chainId = chainId;
        this.comId = comId;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
    }

    public EmptyCall(Call call) {
        this.id = call.getId();
        this.chainId = call.getChainId();
        this.comId = call.getComId();
        this.timeStart = call.getTimeStart();
        this.timeEnd = call.getTimeEnd();
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

    public String getComId() {
        return comId;
    }

    public void setComId(String comId) {
        this.comId = comId;
    }

    public Long getTimeStart() { return timeStart; }

    public void setTimeStart(Long timeStart) { this.timeStart = timeStart; }

    public Long getTimeEnd() { return timeEnd; }

    public void setTimeEnd(Long timeEnd) { this.timeEnd = timeEnd; }


    @Override
    public String toString() {
        return "EmptyCall{" +
                "id=" + id +
                ", chainId='" + chainId + '\'' +
                ", comId='" + comId + '\'' +
                ", timeStart=" + timeStart +
                ", timeEnd=" + timeEnd +
                '}';
    }
}
