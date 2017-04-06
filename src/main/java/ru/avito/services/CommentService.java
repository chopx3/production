package ru.avito.services;

import ru.avito.model.Comment;

import java.util.List;

/**
 * Created by Dmitriy on 06.04.2017.
 */
public interface CommentService {

    Comment save(Comment comment);
    List<Comment> findAllByAvitoUserId(Long avitoUserId);
}
