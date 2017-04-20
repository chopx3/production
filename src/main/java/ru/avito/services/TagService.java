package ru.avito.services;

import ru.avito.model.tags.Tag;
import java.util.List;

/**
 * Created by Dmitriy on 22.02.2017.
 */
public interface TagService {

    Tag save(Tag tag);
    void delete(int id);
    Tag edit(Tag tag);
    Tag findOne(int id);
    List<Tag> findAll();
}
