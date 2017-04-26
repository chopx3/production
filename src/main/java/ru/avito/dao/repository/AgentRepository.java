package ru.avito.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.avito.model.agent.Agent;


/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface AgentRepository extends JpaRepository<Agent, Integer> {

    Agent findByUsername(String username);

    Agent findByOktellLogin(String oktellLogin);

}
