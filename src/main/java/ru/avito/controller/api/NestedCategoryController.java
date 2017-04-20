package ru.avito.controller.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.avito.controller.Path;
import ru.avito.model.NestedCategory;
import ru.avito.model.NestedCategoryMap;
import ru.avito.services.NestedCategoryService;

import java.util.List;
import java.util.TreeSet;

/**
 * Created by Dmitriy on 15.04.2017.
 */


@RestController
@RequestMapping(value = Path.API +"category/nested")
public class NestedCategoryController {


    @Autowired
    NestedCategoryService nestedCategoryService;

    @RequestMapping(value = "create/{parentName}/{childName}")
    public void addNestedCategory(@PathVariable("parentName") String parentName,
                                  @PathVariable("childName") String childName){
        nestedCategoryService.addChildNode(parentName, childName );
    }

    @RequestMapping(value = "delete/{parentName}")
    public void deleteNestedCategory(@PathVariable("parentName") String parentName){
        nestedCategoryService.deleteNode(parentName);
    }

    @RequestMapping(value = "find/name/{name}")
    public List<NestedCategory> findByName(@PathVariable("name") String name){
        return nestedCategoryService.findByName(name);
    }

    @RequestMapping(value = "find/path/{nodeName}")
    public List<NestedCategory> findPathByName(@PathVariable("nodeName") String nodeName){
        return nestedCategoryService.findPathByName(nodeName);
    }

    @RequestMapping(value = "find/map")
    public List<NestedCategoryMap> findCategoryMap(){
        return nestedCategoryService.findCategoryMap();
    }

    @RequestMapping(value = "find/parent/{childName}")
    public NestedCategory findParentByChild(@PathVariable("childName") String childName){
        return nestedCategoryService.findCategoryIdNameLftRgtByName(childName);
    }
}
