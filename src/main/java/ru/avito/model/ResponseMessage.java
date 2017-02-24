package ru.avito.model;

/**
 * Created by Dmitriy on 07.01.2017.
 */
public class ResponseMessage {

    private int code;
    private String status;

    public ResponseMessage(int i, String ok) {
        code=i;
        status = ok;
    }

    public ResponseMessage() {
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
