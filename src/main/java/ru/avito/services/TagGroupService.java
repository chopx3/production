package ru.avito.services;

import ru.avito.model.tags.TagGroup;
import java.util.List;

/**
 * Created by Dmitriy on 22.02.2017.
 */
public interface TagGroupService {

    TagGroup save(TagGroup tagGroup);
    TagGroup update(TagGroup tagGroup);
    List<TagGroup> findAll();
    TagGroup findOne(int id);
    void delete(int id);
}
