package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.model.tags.Tag;
import ru.avito.model.tags.TagGroup;
import ru.avito.repository.TagGroupRepository;
import ru.avito.repository.TagRepository;
import ru.avito.services.TagService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Dmitriy on 22.02.2017.
 */

public class TagServiceImpl implements TagService {



    TagRepository tagRepository;

    TagGroupRepository tagGroupRepository;

    @Override
    public Tag addTag(Tag tag) {

        return tagRepository.saveAndFlush(tag);
    }

    @Override
    public void deleteTag(int id) {
        tagRepository.delete(id);
    }

    @Override
    public Tag editTag(Tag tag) {
        return tagRepository.saveAndFlush(tag);
    }

    @Override
    public Tag findOne(int id) {
        return tagRepository.findOne(id);
    }

    @Override
    public Tag findByName(String name) {
        return tagRepository.findByName(name);
    }

    @Override
    public List<Tag> getAll() {
        return tagRepository.findAll();
    }
}
