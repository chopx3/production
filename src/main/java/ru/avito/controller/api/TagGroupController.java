package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.model.tags.TagGroup;
import ru.avito.services.TagGroupService;

import java.util.List;

/**
 * Created by Dmitriy on 09.03.2017.
 */
@RestController
@RequestMapping(value = Path.API+"taggroup")
public class TagGroupController {

    @Autowired
    TagGroupService tagGroupService;

    @RequestMapping(value ="all")
    public ResponseEntity<List<TagGroup>> findAllTagGroup(){
        return new ResponseEntity<List<TagGroup>>(tagGroupService.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value ="{id}")
    public ResponseEntity findTagGroupByName(@PathVariable("id") int id){
        return new ResponseEntity<TagGroup>(tagGroupService.findOne(id), HttpStatus.OK);
    }

    @RequestMapping(value ="/add", method = RequestMethod.POST)
    public ResponseEntity<TagGroup> saveTagGroup(@RequestBody TagGroup tagGroup){
        tagGroupService.save(tagGroup);
        return new ResponseEntity<TagGroup>(tagGroup,HttpStatus.OK);
    }

    @RequestMapping(value ="/update", method = RequestMethod.POST)
    public ResponseEntity<TagGroup> editTagGroup(@RequestBody TagGroup tagGroup){
        tagGroupService.save(tagGroup);
        return new ResponseEntity<TagGroup>(tagGroup,HttpStatus.OK);
    }


}


