package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.avito.controller.Path;
import ru.avito.model.Question;
import ru.avito.services.QuestionService;

import java.util.List;

/**
 * Created by Dmitriy on 07.04.2017.
 */

@RestController
@RequestMapping(value = Path.API+"question/find")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @RequestMapping(value = {"", "/"})
    public List<Question> findAll(){
        return questionService.findAll();
    }
}
