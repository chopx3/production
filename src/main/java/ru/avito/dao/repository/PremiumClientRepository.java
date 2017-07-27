package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.avito.model.PremiumClient;

public interface PremiumClientRepository extends JpaRepository<PremiumClient, Integer>{
    PremiumClient findByAvitoId(Long avitoId);
    PremiumClient findByContactPhone(Long contactPhone);
    PremiumClient findById(Integer id);
}
