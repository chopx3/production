package ru.avito.factory;

import ru.avito.model.calls.Call;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public class CallFactory<T extends Call> {

    private T t;

        public T getInstance(T call){
            t = call;
            return t;
        }
}
