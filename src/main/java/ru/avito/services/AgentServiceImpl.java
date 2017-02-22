package ru.avito.services;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.avito.dao.AgentDao;
import ru.avito.model.agent.Agent;
import ru.avito.services.AgentService;

/**
 * Created by Dmitriy on 30.12.2016.
 */

@Service
public class AgentServiceImpl implements AgentService {

    private AgentDao agentDao;

    @Transactional
    public Agent getAgentByUsername(String username) {
        return this.agentDao.getAgentByUsername(username);
    }

    @Transactional
    public Agent getAgentByUserId(int id) {
        return this.agentDao.getAgentByUserId(id);
    }

    public void setAgentDao(AgentDao agentDao) {
        this.agentDao = agentDao;
    }
}
