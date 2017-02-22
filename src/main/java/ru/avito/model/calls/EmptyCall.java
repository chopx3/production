package ru.avito.model.calls;

import com.google.gson.Gson;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;

/**
 *
 * Класс описывает объект звонка с незаполненными полями.
 */
public class EmptyCall {

    private String chainId, comId;
    private long startTime;

    public EmptyCall(String chainId, String comId, long startTime) {
        this.chainId = chainId;
        this.comId = comId;
        this.startTime = startTime;
    }

    public String getChainId() {
        return chainId;
    }

    public String getComId() {
        return comId;
    }

    public long getStartTime() {
        return startTime;
    }

}
