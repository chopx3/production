package ru.avito.controller.api;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.dao.repository.CallRepository;
import ru.avito.factory.CallFactory;
import ru.avito.model.agent.Agent;
import ru.avito.model.agent.Role;
import ru.avito.model.calls.*;
import ru.avito.model.tags.Tag;
import ru.avito.services.AgentService;
import ru.avito.services.CallService;
import ru.avito.services.RoleService;
import ru.avito.services.TagService;
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

    @Autowired
    CallFactory callFactory;

    @Autowired
    TagService tagService;

    @Autowired
    RoleService roleService;

    @Autowired
    CallRepository callRepository;

    @RequestMapping(value = "find/agent/{startPeriod}/{endPeriod}")//TODO сделать (проверить URL на фронте)
    public List<Call> findByAgentIdAndTimeStartBetween(HttpSession session,
                                             @PathVariable("startPeriod") Long startPeriod,
                                             @PathVariable("endPeriod")Long endPeriod){

        SecurityContext context = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
        int userId = agentService.findByUsername(context.getAuthentication().getName()).getId();

        if(LOG.isDebugEnabled())
             LOG.debug(
                     String.format("Find empty calls: startPeriod - %s, endPeriod - %s, userId - %s", startPeriod, endPeriod, userId));
        return callService.findByAgentIdAndTimeStartBetween(userId, startPeriod, endPeriod);
    }

    @RequestMapping(value = "update", method = RequestMethod.POST)
    public Integer saveCall( @RequestBody UpdatedCall updatedCall){ //TODO запилить HttpSession
        if(LOG.isDebugEnabled())
            LOG.debug("Incoming Updated call: "+updatedCall);
        return callService.save(updatedCall);
    }

    @RequestMapping(value = "feedback/save", method = RequestMethod.POST)
    public Integer saveCall( @RequestBody FeedbackCall feedbackCall){ //TODO запилить HttpSession
        if(LOG.isDebugEnabled())
            LOG.debug("Incoming Feedback call: "+feedbackCall);
        return callService.save(feedbackCall);
    }

    @RequestMapping(value = "find/type/{typecall}/{startPeriod}/{endPeriod}", method = RequestMethod.GET)//TODO Проверить URL на фронте
    public List<Call> findEmptyCall(@PathVariable("typecall") String typeCall,
                                    @PathVariable("startPeriod") Long startPeriod,
                                    @PathVariable("endPeriod") Long endPeriod,
                                    HttpSession session){
        SecurityContext context = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
        String username = context.getAuthentication().getName();
        Agent agent = agentService.findByUsername(username);
        LOG.debug(String.format("Find %s calls for user - %s", typeCall, username));
        Role roleAdmin = roleService.findOne(1);
        if (agent.getRoles().contains(roleAdmin)){
            return callService.findByTimeStartBetweenAndType(startPeriod, endPeriod, typeCall);
        } else {
            return callService.findByTimeStartBetweenAndAgentIdAndType(agent.getId(), startPeriod, endPeriod, typeCall);
        }
    }


    @RequestMapping(value = "find/tags", method = RequestMethod.POST)
    public List<Call> findEmptyCall(@RequestBody List<Tag> tags){
        return callService.findByTags(tags);
    }

    @RequestMapping(value = "find/user/{avitoUserId}/{page}", method = RequestMethod.GET) //TODO сделать красиво пагинацию
    public List<Call> findByAvitoUserId(@PathVariable("avitoUserId") Long avitoUserId, @PathVariable("page") Integer page){
        PageRequest aPage = new PageRequest(page, 20, Sort.Direction.DESC, "timeStart");
        return callService.findByAvitoUserId(avitoUserId, aPage);
    }

    @RequestMapping(value = "find/questions/{ids}/{startPeriod}/{endPeriod}", method = RequestMethod.GET)
    public List<Call> findByQuestionIdAndTimeStartBetween(@PathVariable("startPeriod") Long startPeriod,
                                    @PathVariable("endPeriod") Long endPeriod,
                                    @PathVariable Integer ids){
        return callService.findByQuestionIdAndTimeStartBetween(ids, startPeriod, endPeriod);
    }
}
