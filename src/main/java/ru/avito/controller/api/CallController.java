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
import ru.avito.model.CallModel;
import ru.avito.model.calls.Call;
import ru.avito.model.calls.EmptyCall;
import ru.avito.model.calls.UpdatedCall;
import ru.avito.services.AgentService;
import ru.avito.services.CallService;

import javax.servlet.http.HttpSession;
import javax.ws.rs.QueryParam;
import java.lang.reflect.Array;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

/**
 * Created by Dmitriy on 30.03.2017.
 */

@RestController
@RequestMapping(value = Path.API+"call")
public class CallController {

    private final static Logger LOG = LogManager.getLogger();

    @Autowired
    CallService callService;

    @Autowired
    AgentService agentService;

    @RequestMapping(value = "find/{id}")
    public List<Call> findOne(@PathVariable("id") Integer id){
        return callService.findByAgentId(id);
    }


    @RequestMapping(value = "find/{startPeriod}/{endPeriod}/{userId}")
    public List<Call> findByAgentIdAndTimeStartBetween(@PathVariable("userId") Integer userId,
                                             @PathVariable("startPeriod") Long startPeriod,
                                             @PathVariable("endPeriod")Long endPeriod){
        LOG.debug(
                String.format("Find empty calls: startPeriod - %s, endPeriod - %s, userId - %s", startPeriod, endPeriod, userId));

        return callService.findByAgentIdAndTimeStartBetween(userId, startPeriod, endPeriod);
    }

    @RequestMapping(value = "find/empty")
    public List<Call> findByAgentIdAndTimeStartBetween(HttpSession session){

        SecurityContext context = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
        String username = context.getAuthentication().getName();

        LOG.debug(
                String.format("Find empty calls for user - %s", username));

        return callService.findByAgentIdAndTimeStartGreaterThan(agentService.findByUsername(username).getId());
    }




    @RequestMapping(value = "save")
    public Integer saveCall( @RequestBody UpdatedCall updatedCall){

//        LOG.debug("Update call: "+updatedCall);
        return callService.save(updatedCall);
    }

}
