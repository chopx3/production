package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.response.ResponseMessage;
import ru.avito.model.tags.Tag;
import ru.avito.services.TagService;

import java.util.List;

/**
 * Created by Dmitriy on 23.02.2017.
 */

@RestController
@RequestMapping(value = Path.API+"tags")
public class TagController {

    @Autowired
    TagService tagService;

    @RequestMapping(value ="find")
    public List <Tag> findAllTags(){
        return tagService.findAll();
    }

    @RequestMapping(value ="find/{id}")
    public Tag findTagByName(@PathVariable("id") int id){
        return tagService.findOne(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value ="/save", method = RequestMethod.POST)
    public ResponseMessage saveTag(@RequestBody Tag tag){
        tagService.save(tag);
        return new ResponseMessage(201,"ok");
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value ="/update", method = RequestMethod.POST)
    public ResponseMessage editTag(@RequestBody Tag tag){
        tagService.edit(tag);
        return new ResponseMessage(201,"ok");
    }


}
