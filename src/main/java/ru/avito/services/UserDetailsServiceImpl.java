package ru.avito.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import ru.avito.controller.EchoHandler;
import ru.avito.dao.AgentDao;
import ru.avito.model.Agent;
import ru.avito.model.Role;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import static ru.avito.model.AuthorizedUsers.authorizedUsers;

/**
 * Created by Dmitriy on 04.01.2017.
 */
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    AgentDao agentDao;

    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Agent agent = agentDao.getAgentByUsername(username);

        Set<GrantedAuthority> grantedAuthorities = new HashSet();

        for (Role role : agent.getRoles()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        }

        authorizedUsers.put(agent.getUsername(), agent);

        return new User(agent.getUsername(), agent.getPass(), grantedAuthorities);

    }
}
