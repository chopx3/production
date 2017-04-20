package ru.avito.services;

import ru.avito.model.NestedCategory;
import ru.avito.model.NestedCategoryMap;

import java.util.List;

/**
 * Created by Dmitriy on 15.04.2017.
 */
public interface NestedCategoryService {

    void addChildNode(String parentName, String childName);
    void deleteNode(String categoryName);
    List<NestedCategory> findByName(String name);
    List<NestedCategory> findPathByName(String nodeName);
    List<NestedCategoryMap> findCategoryMap();
    NestedCategory findCategoryIdNameLftRgtByName(String childName);
}
