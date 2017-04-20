package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.avito.model.Comment;

import java.util.List;

/**
 * Created by Dmitriy on 06.04.2017.
 */
public interface CommentRepository extends JpaRepository<Comment, Integer> {


    List<Comment> findAllByAvitoUserIdOrderByPostTimeDesc(Long avitoUserId);

}
