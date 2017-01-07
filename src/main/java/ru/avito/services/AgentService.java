package ru.avito.services;

import org.springframework.stereotype.Service;
import ru.avito.dao.AgentDao;
import ru.avito.model.Agent;

/**
 * Created by Dmitriy on 30.12.2016.
 */


public interface AgentService {

    Agent getAgentByUsername(String username);
    Agent getAgentByUserId(int id);
}
