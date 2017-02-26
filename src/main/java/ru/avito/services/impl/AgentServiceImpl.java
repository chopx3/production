package ru.avito.services.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.avito.dao.AgentDao;
import ru.avito.model.agent.Agent;
import ru.avito.repository.AgentRepository;
import ru.avito.services.AgentService;

import java.util.List;

/**
 * Created by Dmitriy on 30.12.2016.
 */

@Service
public class AgentServiceImpl implements AgentService {


    @Autowired
    private AgentRepository agentRepository;

    @Override
    public Agent save(Agent agent) {
        return agentRepository.saveAndFlush(agent);
    }

    @Override
    public Agent edit(Agent actualAgent) {
        Agent currentAgent = agentRepository.findOne(actualAgent.getId());
        currentAgent.setOktellLogin(actualAgent.getOktellLogin());
        currentAgent.setPassword(actualAgent.getPassword());
        currentAgent.setRoles(actualAgent.getRoles());
        currentAgent.setUsername(actualAgent.getUsername());
        return agentRepository.saveAndFlush(currentAgent);
    }

    @Override
    public void delete(Agent agent) {

        agentRepository.delete(agent);

    }

    @Override
    public Agent findOne(int id) {
        return agentRepository.findOne(id);
    }

    @Override
    public Agent findByUsername(String username) {
        return agentRepository.findByUsername(username);
    }

    @Override
    public List<Agent> findAll() {
        return agentRepository.findAll();
    }
}
