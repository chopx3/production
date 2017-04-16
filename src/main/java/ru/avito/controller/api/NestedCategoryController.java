package ru.avito.controller.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.avito.controller.Path;
import ru.avito.services.NestedCategoryService;

/**
 * Created by Dmitriy on 15.04.2017.
 */


@RestController
@RequestMapping(value = Path.API +"category/nested")
public class NestedCategoryController {


    @Autowired
    NestedCategoryService nestedCategoryService;

    @RequestMapping(value = "create/{parentName/childName}")
    public void addNestedCategory(@PathVariable("parentName") String parentName,
                                  @PathVariable("childName") String childName){
        nestedCategoryService.addChildNode(parentName, childName );
    }

    @RequestMapping(value = "delete/parentName")
    public void deleteNestedCategory(@PathVariable("parentName") String parentName){
        nestedCategoryService.deleteNode(parentName);
    }

}
