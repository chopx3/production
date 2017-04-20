package ru.avito.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.avito.controller.Path;
import ru.avito.model.Product;
import ru.avito.services.ProductService;

import java.util.List;

/**
 * Created by Dmitriy on 17.04.2017.
 */


@RestController
@RequestMapping(value= Path.API+"product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "save",method = RequestMethod.POST)
    public Product save(@RequestBody Product product){
        return productService.save(product);
    }

    @RequestMapping(value = "find/category/id/{id}",method = RequestMethod.GET)
    public List<Product> findByCategoryId(@PathVariable("id") Integer categoryId){
        return productService.findByCategoryId(categoryId);
    }

    @RequestMapping(value = "update",method = RequestMethod.POST)
    public Product update(@RequestBody Product product){
        return productService.save(product);
    }



}
