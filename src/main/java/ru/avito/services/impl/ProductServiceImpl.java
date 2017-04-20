package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.Product;
import ru.avito.dao.repository.ProductRepository;
import ru.avito.services.ProductService;

import java.util.List;

/**
 * Created by Dmitriy on 17.04.2017.
 */
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> findByCategoryId(Integer categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product update(Product actualProduct) {
        Product currentProduct =  productRepository.findOne(actualProduct.getId());
        currentProduct.setCategoryId(actualProduct.getCategoryId());
        currentProduct.setName(actualProduct.getName());
        return productRepository.save(actualProduct);
    }
}
