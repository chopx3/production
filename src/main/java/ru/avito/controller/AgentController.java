package ru.avito.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.avito.model.agent.Agent;
import ru.avito.repository.AgentRepository;
import ru.avito.services.AgentService;

/**
 * Created by Dmitriy on 26.02.2017.
 */
@RestController
@RequestMapping(value = "agent") //TODO добавить CRUD для данных агентов
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
}
