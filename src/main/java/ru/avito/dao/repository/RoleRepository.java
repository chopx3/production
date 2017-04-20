package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.avito.model.agent.Role;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Query(name="select r from Role r where r.name =:rolename")
    Role findByName(@Param("rolename") String rolename);
}
