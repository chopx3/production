package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.agent.Role;
import ru.avito.dao.repository.RoleRepository;
import ru.avito.services.RoleService;
import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public class RoleServiceImpl implements RoleService{

    @Autowired
    RoleRepository roleRepository;

    @Override
    public Role save(Role role) {
        return roleRepository.saveAndFlush(role);
    }

    @Override
    public Role update(Role actualRole) {
        Role currentRole = roleRepository.findOne(actualRole.getId());
        currentRole.setName(actualRole.getName());
        return roleRepository.saveAndFlush(currentRole);
    }

    @Override
    public Role findOne(int id) {
        return roleRepository.findOne(id);
    }

    @Override
    public void delete(int id) {
        roleRepository.delete(id);
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }
}
