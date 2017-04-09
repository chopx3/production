package ru.avito.controller.api;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.factory.CallFactory;
import ru.avito.response.ResponseMessage;
import ru.avito.model.oktell.Chain;
import ru.avito.services.CallService;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@RestController
@RequestMapping(value = Path.API+"oktell")
public class OktellController {

    @Autowired
    CallService callService;

    @Autowired
    CallFactory callFactory;

    private final static Logger LOG = LogManager.getLogger();

    @ResponseStatus(HttpStatus.CREATED)//TODO запаролить путь и сделать токен для октелла.
    @RequestMapping(value = "chain/save", method = RequestMethod.POST)
    public ResponseMessage saveChain(@RequestBody Chain chain){
        LOG.info(String.format("New chain: %s", chain));
        callService.save(callFactory.getInstance(chain));
        return new ResponseMessage(201, "Chain saved.");
    }
}
