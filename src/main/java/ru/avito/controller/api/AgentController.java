package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @ResponseStatus(HttpStatus.CREATED)//TODO затестить
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public Agent saveAgent(@RequestBody Agent agent){
        return agentService.save(agent);
    }

    @ResponseStatus(HttpStatus.CREATED) //TODO затестить
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public Agent updateAgent(@RequestBody Agent agent){
        return agentService.update(agent);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "oktelllogin/{oktellLogin}", method = RequestMethod.GET)
    public Agent findByOktellLogin(@PathVariable("oktellLogin") String oktellLogin){
        return agentService.findByOktellLogin(oktellLogin);
    }

}
