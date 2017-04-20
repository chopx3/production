package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import ru.avito.model.agent.Agent;
import ru.avito.model.agent.Role;
import ru.avito.dao.repository.AgentRepository;
import java.util.HashSet;
import java.util.Set;

import static ru.avito.model.agent.AuthorizedUsers.authorizedUsers;

/**
 * Created by Dmitriy on 04.01.2017.
 */
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    AgentRepository agentRepository;

    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Agent agent = agentRepository.findByUsername(username);
        Set<GrantedAuthority> grantedAuthorities = new HashSet();
        for (Role role : agent.getRoles()) {
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        authorizedUsers.put(agent.getUsername(), agent);

        return new User(agent.getUsername(), agent.getPassword(), grantedAuthorities);

    }
}
