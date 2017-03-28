package ru.avito.model.calls.oktell;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dmitriy on 09.03.2017.
 */
public class OktellCall {
    List<Chain> chains;

    public OktellCall(List<Chain> chains) {
        this.chains = chains;
    }

    @Override
    public String toString() {
        return "OktellCall{" +
                "chains=" + chains +
                '}';
    }
}
