package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.model.Comment;
import ru.avito.model.agent.Agent;
import ru.avito.services.AgentService;
import ru.avito.services.CommentService;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Dmitriy on 06.04.2017.
 */

@RestController
@RequestMapping(value = Path.API+"comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @Autowired
    AgentService agentService;

    @RequestMapping(value = "user/{avitoUserId}", method = RequestMethod.GET)
    public List<Comment> findAllByAvitoUserIdOrderByPostTimeDesc(@PathVariable("avitoUserId") Long avitoUserId) {
        return commentService.findAllByAvitoUserIdOrderByPostTimeDesc(avitoUserId);
    }

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public Comment save(@RequestBody Comment comment, HttpSession httpSession) {
        SecurityContext context = (SecurityContext) httpSession.getAttribute("SPRING_SECURITY_CONTEXT");
        String username = context.getAuthentication().getName();
        Agent agent = agentService.findByUsername(username); //TODO лишнее обращение к БД
        comment.setAgent(agent);
        return commentService.save(comment);
    }

    @RequestMapping(value = "addFromAdm", method = RequestMethod.POST)
    public Comment save(@RequestBody Comment comment) {
        Agent agent = agentService.findByUsername("fromAdm"); //TODO лишнее обращение к БД
        comment.setAgent(agent);
        return commentService.save(comment);
    }

}
