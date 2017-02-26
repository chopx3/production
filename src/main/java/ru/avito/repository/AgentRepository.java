package ru.avito.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.avito.model.agent.Agent;

import javax.ws.rs.QueryParam;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface AgentRepository extends JpaRepository<Agent, Integer> {

    @Query(name = "select a from Agent a where a.username = :username")
    Agent findByUsername(@QueryParam("username") String username);
}
