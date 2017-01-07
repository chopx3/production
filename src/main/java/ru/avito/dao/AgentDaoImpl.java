package ru.avito.dao;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import ru.avito.model.Agent;

import java.time.temporal.TemporalQuery;
import java.util.List;

/**
 * Created by Dmitriy on 30.12.2016.
 */

@Repository
public class AgentDaoImpl implements AgentDao {

    private SessionFactory sessionFactory;

    @SuppressWarnings("unchecked")
    public Agent getAgentByUsername(String username) {

        Session session = this.sessionFactory.getCurrentSession();
        Criteria criteria = session.createCriteria(Agent.class);

        List<Agent> agents=criteria.add(Restrictions.eq("username", username)).list();

        return agents.get(0);
    }

    public Agent getAgentByUserId(int id){
        Session session = this.sessionFactory.getCurrentSession();
        Agent agent = (Agent) session.load(Agent.class, new Integer(id));
        System.out.println(agent);
        return agent;
    }

    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
}
