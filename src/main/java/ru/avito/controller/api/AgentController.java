package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.*;
import ru.avito.JsonConverter;
import ru.avito.controller.Path;
import ru.avito.model.agent.Agent;
import ru.avito.services.AgentService;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@RestController
@RequestMapping(value = Path.API+"agent") //TODO добавить CRUD для данных агентов, Подумать как защитить пароль. Сейчас он просто заменяется словом PROTECTED
public class AgentController {

    @Autowired
    private AgentService agentService;

    @RequestMapping(value = "find", method = RequestMethod.GET)
    private List<Agent> findAll(){
        return agentService.findAll();
    }

    @RequestMapping(value = "find/id/{id}", method = RequestMethod.GET)
    private Agent findAgentById(@PathVariable("id") Integer id){
        return agentService.findOne(id);
    }

    @RequestMapping(value = "find/username/{username}", method = RequestMethod.GET)
    private Agent findAgentByUsername(@PathVariable("username") String username){
        return agentService.findByUsername(username);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public Agent saveAgent(@RequestBody Agent agent){
        return agentService.save(agent);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public Agent updateAgent(@RequestBody Agent agent){
        return agentService.update(agent);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "notes/update", method = RequestMethod.POST)
    public String updateNotesAgent(@RequestBody Agent agent){
        return agentService.updateNotes(agent);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "notes/find", method = RequestMethod.GET)
    public String findNotesAgent(HttpSession session){
        SecurityContext context = (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
        Agent agent = agentService.findByUsername(context.getAuthentication().getName());
        return JsonConverter.buildJsonByField(agent);
    }
}
