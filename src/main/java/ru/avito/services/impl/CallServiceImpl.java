package ru.avito.services.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import ru.avito.model.agent.AuthorizedUsers;
import ru.avito.model.calls.Call;
import ru.avito.model.calls.EmptyCall;
import ru.avito.model.calls.UpdatedCall;
import ru.avito.repository.CallRepository;
import ru.avito.response.EmptyCallAsJson;
import ru.avito.response.ResponseMessage;
import ru.avito.services.AgentService;
import ru.avito.services.CallService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Created by Dmitriy on 26.02.2017.
 */
@Service
public class CallServiceImpl implements CallService {

    private static ConcurrentHashMap<Integer, List<Integer>> commaSeparatedIdCallsByAgent = new ConcurrentHashMap<>();

    private final static Logger LOG = LogManager.getLogger();

    @Autowired
    CallRepository callRepository;

    @Autowired
    AgentService agentService;

    @Transactional
    public List<Call> save(List<Call> calls) {
        HashSet<Integer> agentsId = new HashSet<>();
        for(Call call : calls){
            callRepository.save(call);
            agentsId.add(call.getAgentId());
        }
        LOG.debug(calls);
        for(int id : agentsId){
            try {
                List<EmptyCall>emptyCalls = new ArrayList<>();
                List<Integer> ids = new ArrayList<>();
                for(Call call : callRepository.findByAgentIdAndTimeStartBetween(id, startCurrentDay(), startCurrentDay() + 86400)){
                    ids.add(call.getId());
                    LOG.debug("create emptyCall by: " + call);
                    EmptyCall emptyCall = new EmptyCall(call);
                    LOG.debug("result: " + emptyCall);
                    emptyCalls.add(emptyCall);
                    LOG.debug(ids);
                    commaSeparatedIdCallsByAgent.put(id, ids);
                }
                String response = new EmptyCallAsJson(id, agentService.findOne(id).getUsername(), emptyCalls).toJson();
                LOG.debug(response);
                AuthorizedUsers.webSocketSessions.get(id).sendMessage(new TextMessage(response));
            } catch (IOException e) {
                LOG.error(e);
            }catch (NullPointerException e ){
                LOG.error(String.format("Agent %s is offline!!!", id));
            }catch(DataIntegrityViolationException e){
                LOG.error("Duplicate com_id");
            }
        }
        return calls;
    }

    @Override
    @Transactional
    public Integer save(UpdatedCall call) {
//        LOG.debug(call);
         callRepository.updateParamsForEmptyCall(call.getAvitoUserId(), call.getQuestId(), call.getShopCategoryId(),
                call.getIsManager(),call.getTags(), commaSeparatedIdCallsByAgent.get(call.getAgentId()));
        return 1;//TODO шляпа
    }

    @Override
    public Call findOne(Integer id) {
        return callRepository.findOne(id);
    }

    @Override
    public List<Call> findByAgentId(Integer agentId) {
        return callRepository.findByAgentId(agentId);
    }

    @Override
    public List<Call> findByAgentIdAndTimeStartBetween(Integer agentId, Long timeStart, Long timeEnd) {
        return callRepository.findByAgentIdAndTimeStartBetween(agentId, timeStart, timeEnd);
    }

    @Override
    public List<Call> findByAgentIdAndTimeStartGreaterThan(Integer userId) {
        return callRepository.findByAgentIdAndTimeStartGreaterThan(userId, startCurrentDay());
    }

    /**
     * секунды
     * @return time в секундах
     */
    private Long startCurrentDay(){
        LocalDate now = LocalDate.now();
        ZoneId zoneId = ZoneId.systemDefault();
        return now.atStartOfDay(zoneId).toEpochSecond();
    }


//TODO удалить
    @Override
    public List<EmptyCall> findCallForPeriodByAgent(Integer agentId, Long startPeriod, Long endPeriod) {
        LOG.debug(String.format("build empty call list for agent %s by period %s - %s", agentId, startPeriod, endPeriod));

        List<EmptyCall> emptyCalls = new ArrayList<>();
        try {
            List<Call> calls = callRepository.findCallForPeriodByAgentId(agentId, startPeriod, endPeriod);
            LOG.debug("list calls: "+ calls);

            for( Call call : calls){
                EmptyCall emptyCall = new EmptyCall(call);
                emptyCalls.add(emptyCall);
            }
        } catch (Exception e){
            LOG.error(e);
        }
        LOG.debug(emptyCalls);
        return emptyCalls;
    }



}
