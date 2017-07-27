package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.dao.repository.PremiumClientRepository;
import ru.avito.model.PremiumClient;
import ru.avito.services.PremiumClientService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class PremiumClientServiceImpl implements PremiumClientService{

    @Autowired
    PremiumClientRepository premiumClientRepository;

    @Transactional
    public PremiumClient update(PremiumClient actualClient) {
        PremiumClient currentClient = premiumClientRepository.findOne(actualClient.getId());
        currentClient.setAvitoId(actualClient.getAvitoId());
        currentClient.setUsername(actualClient.getUsername());
        currentClient.setContactPerson(actualClient.getContactPerson());
        currentClient.setComments(actualClient.getComments());
        currentClient.setAdmPhone(actualClient.getAdmPhone());
        currentClient.setContactPhone(actualClient.getContactPhone());
        currentClient.setAdditionalPhones(actualClient.getAdditionalPhones());
        return premiumClientRepository.save(currentClient);
    }

    @Override
    public PremiumClient add(PremiumClient premiumClient) {
        return premiumClientRepository.saveAndFlush(premiumClient);
    }

    @Override
    public List<PremiumClient> findAll() {
        return premiumClientRepository.findAll();
    }

    public PremiumClient findById(int id ){return premiumClientRepository.findById(id);}

    @Override
    public PremiumClient findByAvitoId(Long avitoId) {
        return premiumClientRepository.findByAvitoId(avitoId);
    }

    @Override
    public PremiumClient findByContactPhone(Long contactPhone) {
        return premiumClientRepository.findByContactPhone(contactPhone);
    }
}
