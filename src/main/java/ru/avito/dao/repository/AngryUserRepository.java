package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.avito.model.AngryUser;

public interface AngryUserRepository extends JpaRepository<AngryUser, Integer> {

}
