package ru.avito.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.avito.model.ResponseMessage;
import ru.avito.model.calls.IncomingCall;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@RestController
@RequestMapping(value = "oktell/call")
public class OktellController {

    private final static Logger LOG = LogManager.getLogger();

    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public ResponseMessage saveCallRecord(@RequestBody IncomingCall incomingCall){
        LOG.debug(incomingCall);
        return new ResponseMessage(201,"ok");
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "load", method = RequestMethod.GET)
    public ResponseMessage saveCallRecord(){

        return new ResponseMessage(200 ,"ok");
    }
}
