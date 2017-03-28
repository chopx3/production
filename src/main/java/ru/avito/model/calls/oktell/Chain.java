package ru.avito.model.calls.oktell;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dmitriy on 09.03.2017.
 */
public class Chain {
    String chainId;
    List<Commutation> commutations;

    public void setChainId(String chainId) {
        this.chainId = chainId;
    }

    public void setCommutations(List<Commutation> commutations) {
        this.commutations = commutations;
    }

    @Override
    public String toString() {
        return "Chain{" +
                "chainId='" + chainId + '\'' +
                ", commutations=" + commutations +
                '}';
    }
}
