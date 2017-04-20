package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.Comment;
import ru.avito.dao.repository.CommentRepository;
import ru.avito.services.CommentService;

import java.util.List;

/**
 * Created by Dmitriy on 06.04.2017.
 */
public class CommentServiceImpl implements CommentService{

    @Autowired
    CommentRepository commentRepository;

    @Override
    public Comment save(Comment comment) {
        return commentRepository.saveAndFlush(comment);
    }

    @Override
    public List<Comment> findAllByAvitoUserIdOrderByPostTimeDesc(Long avitoUserId) {
        return commentRepository.findAllByAvitoUserIdOrderByPostTimeDesc(avitoUserId);
    }
}
