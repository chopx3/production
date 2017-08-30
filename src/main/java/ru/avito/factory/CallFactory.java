package ru.avito.factory;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.avito.model.agent.Agent;
import ru.avito.model.calls.Call;
import ru.avito.model.calls.EmptyCall;
import ru.avito.model.calls.FeedbackCall;
import ru.avito.model.oktell.Chain;
import ru.avito.model.oktell.Commutation;
import ru.avito.services.AgentService;
import java.util.ArrayList;
import java.util.List;


@Component
public class CallFactory {

    private final static Logger LOG = LogManager.getLogger();

    @Autowired
    AgentService agentService;

    public List<Call> getInstance(Chain chain){
        Call call;
        List<Call> calls = new ArrayList<>();

            for(Commutation comm : chain.getCommutations()){
                if (comm.getReasonStart() == 3){
                    comm.setbStr(comm.getaStr());
                }
                try{
                    Agent agent = agentService.findByOktellLogin(comm.getbStr());
                    if(agent != null){
                        call = new Call(
                            agent,
                            chain.getChainId(), comm.getComId(),
                            createPeriod(comm.getTimeStart()),
                            createPeriod(comm.getTimeEnd()),
                            comm.getReasonStart() == 3);
                        call.setType("EMPTY");
                        calls.add(call);
                    }
                }catch (Exception e){
                    LOG.error(e);
                }
            }
            if(LOG.isDebugEnabled())
            LOG.debug(calls);
            return calls;
    }

    public List<EmptyCall> getEmptyCalls(List<Call> calls){
       List<EmptyCall> emptyCalls = new ArrayList<>(calls.size());
       calls.forEach(ec -> emptyCalls.add(new EmptyCall(ec.getId(), ec.getChainId(), ec.getComId(), ec.getTimeStart(),ec.getTimeEnd())));
        return emptyCalls;
    }

    public List<FeedbackCall> getFeedbackCalls(List<Call> calls){//TODO заюзать где нибудь
        List<FeedbackCall> feedbackCalls = new ArrayList<>(calls.size());
        calls.forEach(fc -> feedbackCalls.add(new FeedbackCall(fc.getId(), fc.getAgent().getId(),
                                                                fc.getComId(), fc.getAvitoUserId(), fc.getTimeStart(),
                                                                fc.getType(), fc.getComments(), fc.getTags())));
        return feedbackCalls;
    }


    private long createPeriod(long period){
        return (period - 10800)*1000;
    }
}
