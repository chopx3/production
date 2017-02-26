package ru.avito.services;

import ru.avito.model.agent.Agent;

import java.util.List;

/**
 * Created by Dmitriy on 30.12.2016.
 */


public interface AgentService {

    Agent save(Agent agent);
    Agent edit(Agent agent);
    void delete(Agent agent);
    Agent findOne(int id);
    Agent findByUsername(String username);
    List<Agent> findAll();

}
