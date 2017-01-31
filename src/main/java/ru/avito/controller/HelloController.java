package ru.avito.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import ru.avito.dao.AgentDao;
import ru.avito.services.AgentService;

@Controller
public class HelloController{

    @Autowired
    AgentService agentService;

    @RequestMapping(value ={ "/", "/index"}, method = RequestMethod.GET)
    public String getMainPage(ModelMap model) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String name="";
        if(principal instanceof UserDetails) {
             name = ((UserDetails) principal).getUsername();
        }

        model.addAttribute("username", agentService.getAgentByUsername(name).getOktellLogin());
        return "index";
    }

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String printHello(ModelMap model) {
        model.addAttribute("message", "Hello Spring MVC Framework!");

        return "hello";
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String getTestPage(ModelMap model) {

        model.addAttribute("hello", "Hi user");

        return "testpage";
    }

    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public String getApiPage(ModelMap model) {
        return "api";
    }

    @RequestMapping(value = "/downloader", method = RequestMethod.GET)
    public String getDownloadPage(ModelMap model) {
        return "downloader";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView getLoginPage(@RequestParam(value = "error", required = false) String error) {

        ModelAndView modelAndView = new ModelAndView();

        if(error != null)
            modelAndView.addObject("error", "Username or password incorrect.");
            modelAndView.setViewName("login");
        return modelAndView;
    }

}