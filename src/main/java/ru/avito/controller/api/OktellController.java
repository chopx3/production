package ru.avito.controller.api;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.model.ResponseMessage;
import ru.avito.model.calls.Call;
import ru.avito.model.calls.oktell.Chain;
import ru.avito.services.CallService;

import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@RestController
@RequestMapping(value = Path.API+"oktell")
public class OktellController {

    @Autowired
    CallService callService;

    private final static Logger LOG = LogManager.getLogger();

    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED) //TODO не нужен этот метод
    @RequestMapping(value = "call/save", method = RequestMethod.POST)
    public ResponseMessage saveCallRecord(@RequestBody Call call){
        LOG.debug(call);
        callService.save(call);
        return new ResponseMessage(201,"ok");
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "load", method = RequestMethod.GET)
    public ResponseMessage saveCallRecord(){
        return new ResponseMessage(200 ,"ok");
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "chain/save", method = RequestMethod.POST)
    public void saveChain(@RequestBody Chain chain){
        LOG.debug(chain);
    }
}
