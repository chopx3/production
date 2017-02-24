package ru.avito.services;




import ru.avito.model.tags.TagGroup;

import java.util.List;

/**
 * Created by Dmitriy on 22.02.2017.
 */
public interface TagGroupService {

    TagGroup save(TagGroup tagGroup);
    TagGroup edit(TagGroup tagGroup);
    List<TagGroup> findAll();
    TagGroup findOne(int id);
    TagGroup getByName(String name);
    void delete(int id);
}
