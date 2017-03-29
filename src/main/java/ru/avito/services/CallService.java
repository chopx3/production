package ru.avito.services;

import ru.avito.model.calls.Call;

import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface CallService { //TODO доделать

    List<Call> save(List<Call> calls);
}
