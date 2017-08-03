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

    @Override
    public Question update(Question actualQuestion) {
        Question currentQuestion = questionRepository.findOne(actualQuestion.getId());
        currentQuestion.setDescription(actualQuestion.getDescription());
        currentQuestion.setActive(actualQuestion.getActive());
        currentQuestion.setShortName(actualQuestion.getShortName());
        currentQuestion.setPosition(actualQuestion.getPosition());
        return questionRepository.saveAndFlush(currentQuestion);
    }

    @Override
    public Question add(Question question) {
        question.setActive(false);
        question.setPosition("0");
        return questionRepository.saveAndFlush(question);
    }

    @Override
    public Question findOne(int id) {return questionRepository.findOne(id);}

}
