package ru.avito.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.avito.model.agent.Role;
import ru.avito.services.RoleService;

import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@RestController
@RequestMapping(value = "roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @RequestMapping(value = "get/all")
    public List<Role> findAllRoles(){
        return roleService.findAll();
    }



}
