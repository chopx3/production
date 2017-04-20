package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.avito.model.tags.Tag;

/**
 * Created by Dmitriy on 22.02.2017.
 */
public interface TagRepository extends JpaRepository<Tag, Integer>{

    @Query(name = "select t from Tag t where t.name = :name")
    Tag findByName(@Param("name") String name);

    @Query(name = "select t from Tag t where t.value = :value")
    Tag findByValue(@Param("value") String value);

}
