package ru.avito.services.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import ru.avito.model.agent.Agent;
import ru.avito.model.agent.AuthorizedUsers;
import ru.avito.model.calls.*;
import ru.avito.repository.CallRepository;
import ru.avito.response.EmptyCallAsJson;
import ru.avito.services.AgentService;
import ru.avito.services.CallService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

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


    public List<Call> save(List<Call> calls) {
        HashSet<Agent> agentIds = new HashSet<>();
        for(Call call : calls){
            callRepository.save(call);
            agentIds.add(call.getAgent());
        }
        LOG.debug(calls);
        for(Agent agent : agentIds){
            try {
//                List<EmptyCall>emptyCalls = new ArrayList<>();
//                List<Integer> ids = new ArrayList<>();
//                for(Call call : callRepository.findByAgentIdAndTimeStartBetween(agent.getId(), startCurrentDay(), startCurrentDay() + 86400)){
//                    ids.add(call.getId());
//                    LOG.debug("create emptyCall by: " + call);
//                    EmptyCall emptyCall = new EmptyCall(call);
//                    LOG.debug("result: " + emptyCall);
//                    emptyCalls.add(emptyCall);
//                    LOG.debug(ids);
//                    commaSeparatedIdCallsByAgent.put(agent.getId(), ids);
//                }
                String response = "Exist empty calls";
                LOG.debug(response);
                AuthorizedUsers.webSocketSessions.get(agent.getId()).sendMessage(new TextMessage(response));
            } catch (IOException e) {
                LOG.error(e);
            }catch (NullPointerException e ){
                LOG.error(String.format("Agent %s is offline!!!", agent.getUsername()));
            }catch(DataIntegrityViolationException e){
                LOG.error("Duplicate com_id");
            }
        }
        return calls;
    }

    @Transactional
    public Integer save(UpdatedCall updatedCall) {
        LOG.debug(updatedCall);
        Call currentCall = callRepository.findOne(updatedCall.getId());
        currentCall.setQuestionId(updatedCall.getQuestId());
        currentCall.setShopCategoryId(updatedCall.getShopCategoryId());
        currentCall.setAvitoUserId(updatedCall.getAvitoUserId());
        currentCall.setManager(updatedCall.getIsManager());
        currentCall.setType(updatedCall.getType());
        currentCall.setTags(updatedCall.getTags());
        callRepository.save(currentCall);
        return 1;//TODO шляпа
    }


    public Call findOne(Integer id) {
        return callRepository.findOne(id);
    }

    public List<Call> findByAgentIdAndTimeStartBetween(Integer agentId, Long timeStart, Long timeEnd) {
        return callRepository.findByAgentIdAndTimeStartBetween(agentId, timeStart, timeEnd);
    }

    public List<Call> findByTimeStartGreaterThanAndAgentIdAndType(Integer agentId, String typeCall) {
        return callRepository.findByTimeStartGreaterThanAndAgentIdAndType(startCurrentDay() * 1000L, agentId, typeCall);
    }

    private Long startCurrentDay(){
        LocalDate now = LocalDate.now();
        ZoneId zoneId = ZoneId.systemDefault();
        return now.atStartOfDay(zoneId).toEpochSecond();
    }

}
