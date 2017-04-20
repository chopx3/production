package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.Question;
import ru.avito.dao.repository.QuestionRepository;
import ru.avito.services.QuestionService;

import java.util.List;

/**
 * Created by Dmitriy on 07.04.2017.
 */
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    public List<Question> findAll() {
        return questionRepository.findAll();
    }
}
