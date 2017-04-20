package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.dao.repository.NestedCategoryMapRepository;
import ru.avito.dao.stat.NestedCategoryDao;
import ru.avito.model.NestedCategory;
import ru.avito.dao.repository.NestedCategoryRepository;
import ru.avito.model.NestedCategoryMap;
import ru.avito.services.NestedCategoryService;

import java.util.List;

/**
 * Created by Dmitriy on 15.04.2017.
 */
public class NestedCategoryServiceImpl implements NestedCategoryService {

    @Autowired
    NestedCategoryRepository nestedCategoryRepository;

    @Autowired
    NestedCategoryMapRepository nestedCategoryMapRepository;

    @Autowired
    NestedCategoryDao nestedCategoryDao;

    @Override
    public void addChildNode(String parentName, String childName) {
        nestedCategoryRepository.addChildNode(parentName, childName);
    }

    @Override
    public void deleteNode(String categoryName) {
        nestedCategoryRepository.deleteNode(categoryName);
    }

    @Override
    public List<NestedCategory> findByName(String name) {
        return nestedCategoryRepository.findByName(name);
    }

    @Override
    public List<NestedCategory> findPathByName(String nodeName) {
        return nestedCategoryRepository.findPathByName(nodeName);
    }

    @Override
    public List<NestedCategoryMap> findCategoryMap() { //TODO делаем два SQL запроса и выдаем
                                      //TODO структурированную карту категорий с колличеством айтемов в каждой

        return nestedCategoryMapRepository.findCategoryItemsByLevel();
    }

    public NestedCategory findCategoryIdNameLftRgtByName(String childName){
        return nestedCategoryRepository.findCategoryIdNameLftRgtByName(childName);
    }


}
