package ru.avito.services;

import ru.avito.model.Question;

import java.util.List;

/**
 * Created by Dmitriy on 07.04.2017.
 */
public interface QuestionService {

    List<Question> findAll();
    Question update(Question question);
    Question add(Question question);
    Question findOne(int id);
}
