package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.Category;
import ru.avito.dao.repository.CategoryRepository;
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

    @Override
    public Category findOne(int id) {return categoryRepository.findOne(id);}

    @Override
    public Category update(Category actualCategory) {
        Category currentCategory = categoryRepository.findOne(actualCategory.getId());
        currentCategory.setDescription(actualCategory.getDescription());
        currentCategory.setActive(actualCategory.getActive());
        currentCategory.setShortName(actualCategory.getShortName());
        return categoryRepository.saveAndFlush(currentCategory);
    }

    @Override
    public Category add(Category category) {
        category.setActive(false);
        return categoryRepository.saveAndFlush(category);
    }
}
