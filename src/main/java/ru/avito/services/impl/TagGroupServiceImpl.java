package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.tags.TagGroup;
import ru.avito.dao.repository.TagGroupRepository;
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
    public TagGroup update(TagGroup aTagGroup) {
        TagGroup currentTagGroup = tagGroupRepository.findOne(aTagGroup.getId());
        currentTagGroup.setName(aTagGroup.getName());
        currentTagGroup.setDescription(aTagGroup.getDescription());
        currentTagGroup.setTags(aTagGroup.getTags());

        return tagGroupRepository.saveAndFlush(currentTagGroup);
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
