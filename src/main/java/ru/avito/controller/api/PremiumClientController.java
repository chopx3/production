package ru.avito.controller.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.model.PremiumClient;
import ru.avito.services.PremiumClientService;

import java.util.List;

@RestController
@RequestMapping(value = Path.API+"premium")
public class PremiumClientController {

    @Autowired
    private PremiumClientService premiumClientService;

    @RequestMapping(value = "all", method = RequestMethod.GET)
    private List<PremiumClient> findAll(){
        return premiumClientService.findAll();
    }

    @RequestMapping(value = "avitoid/{avitoid}", method = RequestMethod.GET)
    private PremiumClient findByAvitoId(@PathVariable("avitoid") Long avitoid){return premiumClientService.findByAvitoId(avitoid);}

    @RequestMapping(value = "id/{id}", method = RequestMethod.GET)
    private PremiumClient findById(@PathVariable("id") Integer id){return premiumClientService.findById(id);}

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public PremiumClient updateAgent(@RequestBody PremiumClient premiumClient){
        return premiumClientService.update(premiumClient);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "add", method = RequestMethod.POST)
    public PremiumClient add(@RequestBody PremiumClient premiumClient){
        return premiumClientService.add(premiumClient);
    }

    @RequestMapping(value = "phone/{phone}", method = RequestMethod.GET)
    private PremiumClient findByContactPhone(@PathVariable("phone") Long phone){return premiumClientService.findByContactPhone(phone);}
}
