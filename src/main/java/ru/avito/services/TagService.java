package ru.avito.services;

import ru.avito.model.tags.Tag;
import java.util.List;

/**
 * Created by Dmitriy on 22.02.2017.
 */
public interface TagService {

    Tag addTag(Tag tag);
    void deleteTag(int id);
    Tag editTag(Tag tag);
    Tag findOne(int id);
    List<Tag> getAll();
    Tag findByName(String name);


}
