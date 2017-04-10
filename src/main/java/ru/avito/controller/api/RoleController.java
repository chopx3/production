package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.avito.controller.Path;
import ru.avito.model.agent.Role;
import ru.avito.services.RoleService;

import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@RestController
@RequestMapping(value = Path.API+"roles")
public class RoleController {
                                                //TODO сделать CRUD ечли нужно.
    @Autowired
    private RoleService roleService;

    @RequestMapping(value = "find")
    public List<Role> findAllRoles(){
        return roleService.findAll();
    }

}
