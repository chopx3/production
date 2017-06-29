package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

    @RequestMapping(value = "find")
    public List<Category> findAll(){
        return categoryService.findAll();
    }
}
