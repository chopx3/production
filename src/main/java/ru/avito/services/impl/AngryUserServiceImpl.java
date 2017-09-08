package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.dao.repository.AngryUserRepository;
import ru.avito.model.AngryUser;
import ru.avito.services.AngryUserService;

import java.util.List;

public class AngryUserServiceImpl implements AngryUserService {

    @Autowired
    AngryUserRepository angryUserRepository;

    @Override
    public AngryUser add(AngryUser angryUser) {
        angryUser.setActive(false);
        return angryUserRepository.saveAndFlush(angryUser);
    }

    @Override
    public AngryUser update(AngryUser actualUser) {
        AngryUser currentUser = angryUserRepository.findOne(actualUser.getAvitoid());
        currentUser.setActive(actualUser.getActive());
        currentUser.setEmail(actualUser.getEmail());
        currentUser.setTicket(actualUser.getTicket());
        return angryUserRepository.save(currentUser);
    }

    public List<AngryUser> findAll() {
        return angryUserRepository.findAll();
    }

    public AngryUser findOne(int id) {
        return angryUserRepository.findOne(id);
    }
}
