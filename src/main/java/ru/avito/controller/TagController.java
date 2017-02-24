package ru.avito.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.avito.model.ResponseMessage;
import ru.avito.model.tags.Tag;
import ru.avito.model.tags.TagGroup;
import ru.avito.services.TagGroupService;
import ru.avito.services.TagService;

import java.util.List;

/**
 * Created by Dmitriy on 23.02.2017.
 */

@RestController
public class TagController {

    @Autowired
    TagService tagService;

    @Autowired
    TagGroupService tagGroupService;

    @RequestMapping(value ="tag/{id}")
    public Tag findTagByName(@PathVariable("id") int id){
        return tagService.findOne(id);
    }

    @RequestMapping(value ="tag")
    public List <Tag> findAllTags(){
        return tagService.findAll();
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value ="tag/save", method = RequestMethod.POST)
    public ResponseMessage saveTag(@RequestBody Tag tag){
        tagService.save(tag);
        return new ResponseMessage(201,"ok");
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value ="tag/update", method = RequestMethod.POST)
    public ResponseMessage updateTag(@RequestBody Tag tag){
        tagService.edit(tag);
        return new ResponseMessage(201,"ok");
    }


    @RequestMapping(value ="group/{id}")
    public TagGroup findTagGroupByName(@PathVariable("id") int id){
        return tagGroupService.findOne(id);
    }

    @RequestMapping(value ="group")
    public List<TagGroup> findAllTagGroup(){
        return tagGroupService.findAll();
    }
}
