package ru.avito.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.avito.model.agent.Role;

import javax.ws.rs.QueryParam;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Query(name="select r from Role r where r.name =:rolename")
    Role findByName(@QueryParam("rolename") String rolename);
}
