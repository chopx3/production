package ru.avito.model.calls;

import javax.persistence.Column;

/**
 * Created by Dmitriy on 03.12.2016.
 */


public class IncomingCall extends Call {

    @Column(name = "isManager")
    private Boolean isManager;

    public IncomingCall(String oktellLogin, String chainId, String comId, String aStr, Long timeStart, Long timeEnd, Integer reasonStart ) {
        super(oktellLogin, chainId, comId, aStr, timeStart, timeEnd, reasonStart);
        this.isManager = false;
    }

    public Boolean getManager() {
        return isManager;
    }

    public void setManager(Boolean manager) {
        isManager = manager;
    }

    @Override
    public String toString() {
        return super.toString() + " -IncomingCall {" +
                "isManager=" + isManager +
                "} ";
    }
}

