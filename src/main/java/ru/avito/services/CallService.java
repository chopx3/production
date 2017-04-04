package ru.avito.services;

import ru.avito.model.calls.Call;
import ru.avito.model.calls.EmptyCall;
import ru.avito.model.calls.UpdatedCall;

import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface CallService { //TODO доделать

    List<Call> save(List<Call> calls);
    Integer save(UpdatedCall call);
    List<EmptyCall>findCallForPeriodByAgent(Integer agentId, Long startPeriod, Long endPeriod);
    Call findOne(Integer id);
    List<Call> findByAgentId(Integer agentId);
    List<Call> findByAgentIdAndTimeStartBetween(Integer userId, Long timeStart, Long timeEnd);
    List<Call> findByAgentIdAndTimeStartGreaterThan(Integer userId);
}
