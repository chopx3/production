package ru.avito.services.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.avito.model.agent.Agent;
import ru.avito.dao.repository.AgentRepository;
import ru.avito.services.AgentService;
import java.util.List;

/**
 * Created by Dmitriy on 30.12.2016.
 */

@Service
public class AgentServiceImpl implements AgentService {


    @Autowired
    private AgentRepository agentRepository;


    @Transactional
    public Agent save(Agent agent) {
        agent.setPassword("test"); //TODO убрать хардкод
        return agentRepository.saveAndFlush(agent);
    }


    @Transactional
    public Agent update(Agent actualAgent) {
        Agent currentAgent = agentRepository.findOne(actualAgent.getId());
        currentAgent.setOktellLogin(actualAgent.getOktellLogin());
        currentAgent.setRoles(actualAgent.getRoles());
        currentAgent.setUsername(actualAgent.getUsername());
        return agentRepository.saveAndFlush(currentAgent);
    }


    public void delete(Agent agent) {
        agentRepository.delete(agent);
    }

    public Agent findOne(int id) {
        return agentRepository.findOne(id);
    }

    public Agent findByUsername(String username) {
        return agentRepository.findByUsername(username);
    }

    public List<Agent> findAll() {
        return agentRepository.findAll();
    }

    public Agent hidePassword(Agent agent) {
        return null;//TODO как нибудь защитить пароль при отправке на фронт или в логи.
    }

    public Agent findByOktellLogin(String oktellLogin) {
            return agentRepository.findByOktellLogin(oktellLogin);
    }

    @Transactional
    public String updateNotes(Agent actualAgent) {
        Agent currentAgent = agentRepository.findOne(actualAgent.getId());
        if(actualAgent.getNotes() != null) {
            currentAgent.setNotes(actualAgent.getNotes());
        }
        currentAgent = agentRepository.saveAndFlush(currentAgent);

        return String.format("{\"id\":%s, \"notes\":\"%s\"}",currentAgent.getId(), currentAgent.getNotes());
    }
}
