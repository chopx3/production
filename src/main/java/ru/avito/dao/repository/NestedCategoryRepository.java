package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import ru.avito.model.NestedCategory;

import java.util.List;

/**
 * Created by Dmitriy on 15.04.2017.
 */
public interface NestedCategoryRepository extends JpaRepository<NestedCategory, Integer> {

    @Procedure(name = "addChildNode")
    void addChildNode(@Param("parentName") String parentName, @Param("childName") String childName);

    @Procedure(name = "deleteNode")
    void deleteNode(@Param("categoryName") String categoryName);

    List<NestedCategory> findByName(String name);

    @Query(value = "SELECT parent.name " +
                  "FROM NestedCategory node, " +
                  "NestedCategory AS parent " +
                  "WHERE node.left BETWEEN parent.left AND parent.right " +
                  "AND node.name = :nodeName " +
                  "ORDER BY parent.left")
    List<NestedCategory> findPathByName(@Param("nodeName") String nodeName);


    @Query(value =  "SELECT t1.category_id as category_id, t1.name as name,t1.lft as lft, t1.rgt " +
                    "FROM nested_category t1 INNER JOIN " +
                        "(SELECT t2.category_id " +
                            "FROM nested_category t2, " +
                                 "nested_category t1 " +
                            "WHERE t2.lft < t1.lft AND t2.rgt > t1.rgt " +
                                                  "AND t1.name=:childName " +
                            "ORDER BY t2.rgt-t1.rgt ASC LIMIT 1) AS t2 " +
                    "ON t1.category_id = t2.category_id", nativeQuery = true)
    NestedCategory findCategoryIdNameLftRgtByName(@Param("childName") String childName);
}
