package ru.avito.services.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import ru.avito.model.agent.Agent;
import ru.avito.model.agent.AuthorizedUsers;
import ru.avito.model.calls.*;
import ru.avito.model.tags.Tag;
import ru.avito.dao.repository.CallRepository;
import ru.avito.services.AgentService;
import ru.avito.services.CallService;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by Dmitriy on 26.02.2017.
 */
@Service
public class CallServiceImpl implements CallService {

    //TODO здесь будут храниться chain_id... наверное...
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
        if(LOG.isDebugEnabled())
            LOG.debug(calls);
        for(Agent agent : agentIds){
            try {
                AuthorizedUsers.webSocketSessions.get(agent.getId()).sendMessage(new TextMessage("Exist empty calls"));
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
        if(LOG.isDebugEnabled())
        LOG.debug("Updating call: "+updatedCall);
        List<Call> calls = callRepository.findByChainIdAndAgentId(updatedCall.getChainId(),
                                                                        updatedCall.getAgentId());
        if(LOG.isDebugEnabled())
        LOG.debug("Calls to update: "+ calls);

        for(Call currentCall : calls) {
            currentCall.setQuestionId(updatedCall.getQuestId());
            currentCall.setShopCategoryId(updatedCall.getShopCategoryId());
            currentCall.setAvitoUserId(updatedCall.getAvitoUserId());
            currentCall.setManager(updatedCall.getIsManager());
            currentCall.setType(updatedCall.getType());
            currentCall.setTags(updatedCall.getTags());
            callRepository.save(currentCall);
        }
        return 1;//TODO шляпа
    }

    public Integer save(FeedbackCall actualCall){
        if(LOG.isDebugEnabled())
             LOG.debug("Feedback calls updating "+actualCall);
        List<Call> calls = callRepository.findByChainIdAndAgentId(actualCall.getChainId(),
                actualCall.getAgentId());
        if(LOG.isDebugEnabled())
             LOG.debug("Calls by chainId fo agent: "+calls);
        for(Call currentCall : calls) {
            currentCall.setComments(actualCall.getComments());
            currentCall.setTags(actualCall.getTags());
            currentCall.setType(actualCall.getType());
            callRepository.save(currentCall);
            if(LOG.isDebugEnabled())
                LOG.debug("Feedback call was updated: "+currentCall);
        }
        return 1;
    }


    public Call findOne(Integer id) {
        return callRepository.findOne(id);
    }

    public List<Call> findByAgentIdAndTimeStartBetween(Integer agentId, Long timeStart, Long timeEnd) {
        return callRepository.findByAgentIdAndTimeStartBetween(agentId, timeStart, timeEnd);
    }

    public List<Call> findByTimeStartBetweenAndAgentIdAndType(Integer agentId, Long startPeriod, Long endPeriod, String typeCall) {
        return callRepository.findByTimeStartBetweenAndAgentIdAndType(startPeriod, endPeriod, agentId, typeCall);
    }

    @Override
    public List<Call> findByTags(List<Tag> tagsIds) {
        return callRepository.findByTags(tagsIds);
    }

    public List<Call> findByAvitoUserId(Long avitoUserId, PageRequest aPage) {
        return callRepository.findByAvitoUserId(avitoUserId, aPage);
    }

    public List<Call> findByQuestionIdAndTimeStartBetween(List<Integer> ids, Long timeStart, Long timeEnd){
        return callRepository.findByQuestionIdAndTimeStartBetween(ids, timeStart, timeEnd);
    }

    @Override
    public List<Call> findByTimeStartBetweenAndType(Long timeStart, Long timeEnd, String typeCall) {
        return callRepository.findByTimeStartBetweenAndType(timeStart, timeEnd, typeCall);
    }

    private Long startCurrentDay(){
        LocalDate now = LocalDate.now();
        ZoneId zoneId = ZoneId.systemDefault();
        return now.atStartOfDay(zoneId).toEpochSecond();
    }

}
