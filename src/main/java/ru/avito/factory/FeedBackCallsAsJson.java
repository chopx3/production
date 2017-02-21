package ru.avito.factory;

import ru.avito.model.FeedbackCall;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;

/**
 * Created by Dmitriy on 25.01.2017.
 */
public class FeedBackCallsAsJson {

    private ArrayList<FeedbackCall> records;
    private long lastUpdateTimeMs;

    public FeedBackCallsAsJson(ArrayList<FeedbackCall> records, long lastUpdateTimeMs) {
        this.records = records;
        this.lastUpdateTimeMs = LocalDateTime
                .now() //TODO копипаста (EmptyCallAsJson)
                .atZone(ZoneId.systemDefault())
                .toInstant()
                .toEpochMilli();
    }

    public ArrayList<FeedbackCall> getRecords() {
        return records;
    }

    public void setRecords(ArrayList<FeedbackCall> records) {
        this.records = records;
    }

    public long getLastUpdateTimeMs() {
        return lastUpdateTimeMs;
    }

    public void setLastUpdateTimeMs(long lastUpdateTimeMs) {
        this.lastUpdateTimeMs = lastUpdateTimeMs;
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("FeedBackCallsAsJson{");
        sb.append("records=").append(records);
        sb.append(", lastUpdateTimeMs=").append(lastUpdateTimeMs);
        sb.append('}');
        return sb.toString();
    }
}