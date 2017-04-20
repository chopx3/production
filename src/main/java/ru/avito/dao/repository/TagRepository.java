package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.avito.model.tags.Tag;

/**
 * Created by Dmitriy on 22.02.2017.
 */
public interface TagRepository extends JpaRepository<Tag, Integer>{

}
