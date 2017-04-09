package ru.avito.controller.api;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.avito.controller.Path;
import ru.avito.model.calls.*;
import ru.avito.services.AgentService;
import ru.avito.services.CallService;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Dmitriy on 30.03.2017.
 */

@RestController
@RequestMapping(value = Path.API+"call") //TODO сделать пагинацию или сортировку
public class CallController {

    private final static Logger LOG = LogManager.getLogger();

    @Autowired
    CallService callService;

    @Autowired
    AgentService agentService;

    @RequestMapping(value = "find/{startPeriod}/{endPeriod}")//TODO сделать
    public List<Call> findByAgentIdAndTimeStartBetween(HttpSession session,
                                             @PathVariable("startPeriod") Long startPeriod,
                                             @PathVariable("endPeriod")Long endPeriod){

        SecurityContext context = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
        int userId = agentService.findByUsername(context.getAuthentication().getName()).getId();
        LOG.debug(
                String.format("Find empty calls: startPeriod - %s, endPeriod - %s, userId - %s", startPeriod, endPeriod, userId));
        return callService.findByAgentIdAndTimeStartBetween(userId, startPeriod, endPeriod);
    }

    @RequestMapping(value = "update")
    public Integer saveCall( @RequestBody UpdatedCall updatedCall){ //TODO запилить HttpSession
//        LOG.debug("Update call: "+updatedCall);
        return callService.save(updatedCall);
    }

    @RequestMapping(value = "find/type/{typecall}")
    public List<Call> findEmptyCall(@PathVariable("typecall") String typeCall, HttpSession session){
        SecurityContext context = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
        String username = context.getAuthentication().getName();
        LOG.debug(String.format("Find empty calls for user - %s", username));
        return callService.findByTimeStartGreaterThanAndAgentIdAndType(agentService.findByUsername(username).getId(), typeCall);
    }
}
