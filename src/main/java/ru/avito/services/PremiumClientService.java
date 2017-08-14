package ru.avito.services;

import ru.avito.model.PremiumClient;
import java.util.List;

public interface PremiumClientService {
    List<PremiumClient> findAll();
    PremiumClient add(PremiumClient premiumClient);
    PremiumClient update(PremiumClient premiumClient);
    PremiumClient updateActiveStatus(PremiumClient premiumClient);
    PremiumClient findById(int id);
    PremiumClient findByAvitoId(Long avitoId);
    PremiumClient findByContactPhone(Long contactPhone);
}
