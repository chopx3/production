package ru.avito.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.avito.model.Category;

/**
 * Created by Dmitriy on 07.04.2017.
 */
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
