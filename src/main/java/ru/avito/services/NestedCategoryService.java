package ru.avito.services;

import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

/**
 * Created by Dmitriy on 15.04.2017.
 */
public interface NestedCategoryService {

    void addChildNode(String parentName, String childName);
    void deleteNode(String categoryName);

}
