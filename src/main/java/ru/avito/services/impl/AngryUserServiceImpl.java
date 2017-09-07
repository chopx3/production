package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.dao.repository.AngryUserRepository;
import ru.avito.model.AngryUser;
import ru.avito.services.AngryUserService;

public class AngryUserServiceImpl implements AngryUserService {

    @Autowired
    AngryUserRepository angryUserRepository;

    @Override
    public AngryUser add(AngryUser angryUser) {
        return angryUserRepository.saveAndFlush(angryUser);
    }

    @Override
    public AngryUser update(AngryUser actualUser) {

        return null;
    }
}
