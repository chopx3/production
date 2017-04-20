package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.avito.model.tags.TagGroup;

/**
 * Created by Dmitriy on 22.02.2017.
 */
public interface TagGroupRepository extends JpaRepository<TagGroup, Integer> {

    @Query(name = "select tg from TagGroup tg where tg.name = :name")
    TagGroup findByName(@Param("name") String name);
}
