package ru.avito.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import ru.avito.model.NestedCategory;

/**
 * Created by Dmitriy on 15.04.2017.
 */
public interface NestedCategoryRepository extends JpaRepository<NestedCategory, Integer> {

    @Procedure(name = "addChildNode")
    void addChildNode(@Param("parentName") String parentName, @Param("childName") String childName);

    @Procedure(name = "deleteNode")
    void deleteNode(@Param("categoryName") String categoryName);

}
