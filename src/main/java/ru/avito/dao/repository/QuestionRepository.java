package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.avito.model.Question;

/**
 * Created by Dmitriy on 07.04.2017.
 */
public interface QuestionRepository extends JpaRepository<Question, Integer> {
}
