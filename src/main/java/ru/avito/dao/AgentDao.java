package ru.avito.dao;

import ru.avito.model.agent.Agent;

/**
 * Created by Dmitriy on 30.12.2016.
 */
public interface AgentDao {

    public Agent getAgentByUsername(String username);

    Agent getAgentByUserId(int id);

}
