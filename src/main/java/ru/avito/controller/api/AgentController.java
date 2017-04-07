package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.model.agent.Agent;
import ru.avito.services.AgentService;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@RestController
@RequestMapping(value = Path.API+"agent") //TODO добавить CRUD для данных агентов, Подумать как защитить пароль. Сейчас он просто заменяется словом PROTECTED
public class AgentController {

    @Autowired
    private AgentService agentService;

    @RequestMapping(value = "id/{id}", method = RequestMethod.GET)
    private Agent findAgentById(@PathVariable("id") int id){
        return agentService.findOne(id);
    }

    @RequestMapping(value = "username/{username}", method = RequestMethod.GET)
    private Agent findAgentByUsername(@PathVariable("username") String username){
        return agentService.findByUsername(username);
    }

    @Secured("ROLE_ADMIN")
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public Agent saveAgent(@RequestBody Agent agent){
        return agentService.save(agent);
    }

    @Secured("ROLE_ADMIN")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public Agent updateAgent(@RequestBody Agent agent){
        return agentService.update(agent);
    }

    @Secured("ROLE_USER")
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "notes/update", method = RequestMethod.POST)
    public String updateNotesAgent(@RequestBody Agent agent){
        return agentService.updateNotes(agent);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "oktelllogin/{oktellLogin}", method = RequestMethod.GET)
    public Agent findByOktellLogin(@PathVariable("oktellLogin") String oktellLogin){
        return agentService.findByOktellLogin(oktellLogin);
    }
}
