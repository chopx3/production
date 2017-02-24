package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.tags.TagGroup;
import ru.avito.repository.TagGroupRepository;
import ru.avito.services.TagGroupService;

import java.util.List;

/**
 * Created by Dmitriy on 22.02.2017.
 */
public class TagGroupServiceImpl implements TagGroupService {

    @Autowired
    TagGroupRepository tagGroupRepository;

    @Override
    public TagGroup save(TagGroup aTagGroup) {
        return tagGroupRepository.saveAndFlush(aTagGroup);
    }

    @Override
    public TagGroup edit(TagGroup aTagGroup) {
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
