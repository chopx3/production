package ru.avito.services;

import ru.avito.model.AngryUser;

import java.util.List;

public interface AngryUserService {
    AngryUser add(AngryUser angryUser);
    AngryUser update(AngryUser angryUser);
    List<AngryUser> findAll();
    AngryUser findOne(int id);
}
