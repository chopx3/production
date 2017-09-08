package ru.avito.controller.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.model.AngryUser;
import ru.avito.services.AngryUserService;

import java.util.List;

@RestController
@RequestMapping(value = Path.API+"angry")
public class AngryUserController {

    @Autowired
    private AngryUserService angryUserService;

    @RequestMapping(value = "all", method = RequestMethod.GET)
    private List<AngryUser> findAll(){
        return angryUserService.findAll();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    private AngryUser findUserById(@PathVariable("id") Integer id){
        return angryUserService.findOne(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public AngryUser updateAngryUser(@RequestBody AngryUser angryUser){
        return angryUserService.update(angryUser);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "add", method = RequestMethod.POST)
    public AngryUser addAngryUser(@RequestBody AngryUser angryUser){
        return angryUserService.add(angryUser);
    }

}


