package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.repository.NestedCategoryRepository;
import ru.avito.services.NestedCategoryService;

/**
 * Created by Dmitriy on 15.04.2017.
 */
public class NestedCategoryServiceImpl implements NestedCategoryService {

    @Autowired
    NestedCategoryRepository nestedCategoryRepository;

    @Override
    public void addChildNode(String parentName, String childName) {
        nestedCategoryRepository.addChildNode(parentName, childName);
    }

    @Override
    public void deleteNode(String categoryName) {
        nestedCategoryRepository.deleteNode(categoryName);
    }
}
