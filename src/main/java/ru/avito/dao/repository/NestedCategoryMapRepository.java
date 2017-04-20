package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import ru.avito.model.NestedCategory;
import ru.avito.model.NestedCategoryMap;

import java.util.List;
import java.util.TreeSet;

/**
 * Created by Dmitriy on 18.04.2017.
 */
public interface NestedCategoryMapRepository extends JpaRepository<NestedCategoryMap, Integer> {

   @Query(value = "SELECT node.category_id as id, node.name AS name, COUNT(parent.name)-1 As level, itemCount.itemsCount " +
                    "FROM(SELECT parent.category_id as id, parent.name as name, COUNT(product.name) As itemsCount " +
                            "FROM nested_category AS node, nested_category AS parent, product " +
                            "WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.category_id = product.category_id " +
                            "GROUP BY parent.name " +
                            "ORDER BY 3 DESC) AS itemCount, " +
                        "nested_category AS node, " +
                        "nested_category AS parent " +
                   "WHERE node.lft BETWEEN parent.lft AND parent.rgt AND itemCount.name=node.name " +
                   "GROUP BY node.name " +
                   "ORDER BY node.lft ASC", nativeQuery = true)
    List<NestedCategoryMap> findCategoryItemsByLevel();


}
