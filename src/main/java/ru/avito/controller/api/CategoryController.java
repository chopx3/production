package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.model.Category;
import ru.avito.services.CategoryService;

import java.util.List;

/**
 * Created by Dmitriy on 07.04.2017.
 */

@RestController
@RequestMapping(value = Path.API+"category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @RequestMapping(value = "all")
    public List<Category> findAll(){
        return categoryService.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "add", method = RequestMethod.POST)
    public Category addCategory(@RequestBody Category category){
        return categoryService.add(category);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "update", method = RequestMethod.POST)
    public Category updateCategory(@RequestBody Category category){
        return categoryService.update(category);
    }
}
