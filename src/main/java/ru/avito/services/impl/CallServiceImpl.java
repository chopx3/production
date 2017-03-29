package ru.avito.services.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.calls.Call;
import ru.avito.repository.CallRepository;
import ru.avito.services.CallService;

import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public class CallServiceImpl implements CallService {

    @Autowired
    CallRepository callRepository;

    private final static Logger LOG = LogManager.getLogger();

    @Override
    public List<Call> save(List<Call> calls) {

        for(Call call : calls){
            Call call1 = callRepository.save(call);
            LOG.debug(call1);
        }
        LOG.debug(calls);
        return calls;
    }
}
