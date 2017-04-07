package ru.avito.services;

import ru.avito.model.Category;

import java.util.List;

/**
 * Created by Dmitriy on 07.04.2017.
 */

public interface CategoryService {

    List<Category> findAll();

}
