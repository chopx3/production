package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.tags.Tag;
import ru.avito.model.tags.TagGroup;
import ru.avito.repository.TagGroupRepository;
import ru.avito.repository.TagRepository;
import ru.avito.services.TagGroupService;
import ru.avito.services.TagService;

import java.util.List;

/**
 * Created by Dmitriy on 22.02.2017.
 */
public class TagGroupServiceImpl implements TagGroupService{


    TagGroupRepository tagGroupRepository;

    @Override
    public TagGroup addTagGroup(TagGroup aTagGroup) {
        return tagGroupRepository.saveAndFlush(aTagGroup);
    }

    @Override
    public TagGroup editTagGroup(TagGroup aTagGroup) {
        return tagGroupRepository.saveAndFlush(aTagGroup);
    }

    @Override
    public List<TagGroup> findAll() {
        return tagGroupRepository.findAll();
    }

    @Override
    public TagGroup findOne(int id) {
        return tagGroupRepository.findOne(id);
    }

    @Override
    public TagGroup getByName(String name) {
        return tagGroupRepository.findByName(name);
    }

    @Override
    public void delete(int id) {

    }
}
