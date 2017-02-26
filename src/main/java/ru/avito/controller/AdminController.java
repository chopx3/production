package ru.avito.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@Controller
@RequestMapping(value = "admin")
public class AdminController { //TODO сделать нормальную страницу об отказе в доступе. Перенести сервлет CRUD Agent

    @RequestMapping(value = "test", method = RequestMethod.GET)
    public String getTestPage(ModelMap model) {
        model.addAttribute("hello", "Hi user");
        return "testpage";
    }

    @RequestMapping(value = "api", method = RequestMethod.GET)
    public String getApiPage(ModelMap model) {
        return "api";
    }

    @RequestMapping(value = "downloader", method = RequestMethod.GET)
    public String getDownloadPage(ModelMap model) {
        return "downloader";
    }

}
