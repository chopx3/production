package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.Category;
import ru.avito.repository.CategoryRepository;
import ru.avito.services.CategoryService;

import java.util.List;

/**
 * Created by Dmitriy on 07.04.2017.
 */
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
}
