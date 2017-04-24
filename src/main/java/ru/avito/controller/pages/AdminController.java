package ru.avito.controller.pages;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.avito.controller.Path;

/**
 * Created by Dmitriy on 26.02.2017.
 */

@Controller
@RequestMapping("admin")
public class AdminController { //TODO сделать нормальную страницу об отказе в доступе. Перенести сервлет CRUD Agent

    @RequestMapping(value = {"/",""}, method = RequestMethod.GET)
    public String getTestPage() {
        return "admin";
    }

    @RequestMapping(value = "feedback", method = RequestMethod.GET)
    public String getFeedbackPage() {
        return "feedback";
    }

//Мертвые страницы

    @RequestMapping(value = "api", method = RequestMethod.GET)
    public String getApiPage() {
        return "api";
    }

    @RequestMapping(value = "downloader", method = RequestMethod.GET)
    public String getDownloadPage() {
        return "downloader";
    }

}
