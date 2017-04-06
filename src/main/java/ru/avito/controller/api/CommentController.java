package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.model.Comment;
import ru.avito.services.CommentService;

import java.util.List;

/**
 * Created by Dmitriy on 06.04.2017.
 */

@RestController
@RequestMapping(value = Path.API+"comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @RequestMapping(value = "find/{avitoUserId}")
    public List<Comment> findCommentByAvitoUserId(@PathVariable("avitoUserId") Long avitoUserId) {
        return commentService.findAllByAvitoUserId(avitoUserId);
    }

    @RequestMapping(value = "save", method = RequestMethod.POST)
    public Comment save(@RequestBody Comment comment) {
        return commentService.save(comment);
    }

}
