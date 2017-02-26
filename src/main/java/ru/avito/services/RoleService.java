package ru.avito.services;

import ru.avito.model.agent.Role;
import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface RoleService {

    Role save(Role role);
    Role edit(Role role);
    Role findOne(int id);
    void delete (int id);
    Role findByName(String rolename);
    List<Role> findAll();
}
