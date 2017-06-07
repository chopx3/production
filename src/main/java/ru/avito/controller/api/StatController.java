package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.avito.controller.Path;
import ru.avito.services.StatService;

import java.sql.ResultSet;
import java.util.List;

/**
 * Created by Dmitriy on 11.04.2017.
 */
@RestController
@RequestMapping(value = Path.API+"stat")
public class StatController {

    @Autowired
    StatService statService;

    @RequestMapping(value = "find/categories/total/{startPeriod}/{endPeriod}", produces = "application/json;charset=UTF-8")
    public String findTotalCallByShopCategory(@PathVariable("startPeriod") Long startPeriod,
                                              @PathVariable("endPeriod") Long endPeriod) {
        return statService.findTotalCallsByShopCategory(startPeriod, endPeriod);
    }

    @RequestMapping(value = "find/outcomings/total/{startPeriod}/{endPeriod}", produces = "application/json;charset=UTF-8")
    public String findTotalOutcommingCalls(@PathVariable("startPeriod") Long startPeriod,
                                           @PathVariable("endPeriod") Long endPeriod) {
        return statService.findTotalOutcomingCalls(startPeriod, endPeriod);
    }

    @RequestMapping(value = "find/questions/total/{startPeriod}/{endPeriod}", produces = "application/json;charset=UTF-8")
    public String findTotalCallsByQuestion(@PathVariable("startPeriod") Long startPeriod,
                                           @PathVariable("endPeriod") Long endPeriod) {
        return statService.findTotalCallsByQuestion(startPeriod, endPeriod);
    }

    @RequestMapping(value = "find/managers/total/{startPeriod}/{endPeriod}", produces = "application/json;charset=UTF-8")
    public String findTotalCallsByManager(@PathVariable("startPeriod") Long startPeriod,
                                           @PathVariable("endPeriod") Long endPeriod) {
        return statService.findTotalCallsByManager(startPeriod, endPeriod);
    }

    @RequestMapping(value = "find/users/total/{startPeriod}/{endPeriod}", produces = "application/json;charset=UTF-8")
    public String findTotalCallsByCategoryAndAvitoUser(@PathVariable("startPeriod") Long startPeriod,
                                          @PathVariable("endPeriod") Long endPeriod) {
        return statService.findTotalCallsByCategoryAndAvitoUser(startPeriod, endPeriod);
    }

    @RequestMapping(value = "find/agents/total/{startPeriod}/{endPeriod}", produces = "application/json;charset=UTF-8")
    public String findTotalCallsByAgent(@PathVariable("startPeriod") Long startPeriod,
                                                       @PathVariable("endPeriod") Long endPeriod) {
        return statService.findTotalCallsByAgent(startPeriod, endPeriod);
    }
//todo проверить url на фронте
    @RequestMapping(value = "find/empty/total/{startPeriod}/{endPeriod}", produces = "application/json;charset=UTF-8")
    public String findTotalEmptyCallsByAgent(@PathVariable("startPeriod") Long startPeriod,
                                             @PathVariable("endPeriod") Long endPeriod) {
        return statService.findTotalEmptyCallsByAgent(startPeriod, endPeriod);
    }


}
