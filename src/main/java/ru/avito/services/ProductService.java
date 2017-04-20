package ru.avito.services;

import ru.avito.model.Product;

import java.util.List;

/**
 * Created by Dmitriy on 17.04.2017.
 */
public interface ProductService {

    List<Product> findByCategoryId(Integer id);
    Product save(Product product);
    Product update(Product update);
}
