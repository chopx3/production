package ru.avito.factory;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.avito.model.agent.Agent;
import ru.avito.model.calls.Call;
import ru.avito.model.oktell.Chain;
import ru.avito.model.oktell.Commutation;
import ru.avito.services.AgentService;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */

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
                    call = new Call(
                            agent,
                            chain.getChainId(), comm.getComId(),
                            createPeriod(comm.getTimeStart()),
                            createPeriod(comm.getTimeEnd()),
                            comm.getReasonStart() == 3);
                    calls.add(call);
                }catch (Exception e){
                    LOG.error(e);
                }
            }
            LOG.debug(calls);
            return calls;
    }


    private long createPeriod(long period){
        return period - 10800;
    }
}
