package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.calls.Call;
import ru.avito.repository.CallRepository;
import ru.avito.services.CallService;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public class CallServiceImpl implements CallService {

    @Autowired
    CallRepository callRepository;

    @Override
    public Call save(Call call) {

        call.setUserId(30); //TODO хардкод
        return callRepository.save(call);
    }
}
