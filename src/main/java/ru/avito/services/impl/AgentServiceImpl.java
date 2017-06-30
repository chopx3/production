package ru.avito.services.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.avito.dao.repository.RoleRepository;
import ru.avito.model.agent.Agent;
import ru.avito.dao.repository.AgentRepository;
import ru.avito.model.agent.Role;
import ru.avito.services.AgentService;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Dmitriy on 30.12.2016.
 */

@Service
public class AgentServiceImpl implements AgentService {


    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public Agent save(Agent agent) {
        agent.setPassword("test"); //TODO убрать хардкод
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findOne(2));
        agent.setDepartment("pro");
        agent.setRoles(roles);
        return agentRepository.saveAndFlush(agent);
    }


    @Transactional
    public Agent update(Agent actualAgent) {
        Agent currentAgent = agentRepository.findOne(actualAgent.getId());
        currentAgent.setOktellLogin(actualAgent.getOktellLogin());
        currentAgent.setRoles(actualAgent.getRoles());
        currentAgent.setUsername(actualAgent.getUsername());
        currentAgent.setDepartment(actualAgent.getDepartment());
        return agentRepository.save(currentAgent);
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
