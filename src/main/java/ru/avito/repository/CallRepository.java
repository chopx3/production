package ru.avito.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import ru.avito.model.calls.Call;
import ru.avito.model.calls.EmptyCall;

import javax.ws.rs.QueryParam;
import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface CallRepository extends JpaRepository<Call,Integer>{ //TODO реализовать репозиторий

        @Query(name = "SELECT username, chain_id, com_id, time_begin " +
                "FROM calls JOIN users ON calls.user_id = users.id " +
                "WHERE user_id = :agentId " +
                "AND time_begin BETWEEN :startDay AND :endDay " +
                "AND (calls.question_id IS NULL " +
                "     OR calls.shop_category_id IS NULL " +
                "     OR calls.avito_link IS NULL) "+
                "ORDER BY time_begin DESC")
        List<Call> findCallForPeriodByAgentId(@Param("agentId") Integer agentId,
                                                     @Param("startDay") Long startDay,
                                                     @Param("endDay") Long endDay);


        @Query(name = "SELECT username, chain_id, com_id, time_begin " +
                "FROM calls JOIN users ON calls.user_id = users.id " +
                "WHERE user_id = :agentId " +
                "AND time_begin BETWEEN :timeStart AND :timeEnd " +
                "ORDER BY time_begin ASC")
        List<Call> findByAgentIdAndTimeStartBetween(@Param("agentId") Integer agentId,
                                        @Param("timeStart") Long timeStart,
                                        @Param("timeEnd") Long timeEnd);


    @Modifying
    @Query(name = "SELECT username, chain_id, com_id, time_begin " +
            "FROM calls JOIN users ON calls.user_id = users.id " +
            "WHERE user_id = :agentId " +
            "AND (calls.question_id IS NULL " +
            "     OR calls.shop_category_id IS NULL " +
            "     OR calls.avito_link IS NULL) "+
            "LIMIT 5 "+
            "ORDER BY time_begin DESC")
    List<Call> findByAgentId(@Param("agentId") Integer agentId);


    @Modifying
    @Query(value = "UPDATE Call c " +
            "SET c.avitoUserId = :avitoUserId, c.questionId = :questionId, c.shopCategoryId = :shopCategoryId, " +
            "c.isManager = :isManager, c.tags = :tags " +
            "WHERE c.id IN (:ids)")
    Integer updateParamsForEmptyCall(@Param("avitoUserId") Long avitoUserId,
                                @Param("questionId") Integer questionId,
                                @Param("shopCategoryId") Integer shopCategoryId,
                                @Param("isManager") Boolean isManager,
                                @Param("tags") String tags,
                                @Param("ids") List<Integer> ids);


    @Modifying
    @Query(name = "SELECT username, chain_id, com_id, time_begin " +
            "FROM calls JOIN users ON calls.user_id = users.id " +
            "WHERE user_id = :agentId " +
            "AND time_begin > :timeStart " +
            "AND (calls.question_id IS NULL " +
            "     OR calls.shop_category_id IS NULL " +
            "     OR calls.avito_link IS NULL) "+
            "ORDER BY time_begin DESC")
    List<Call> findByAgentIdAndTimeStartGreaterThan(@Param("agentId") Integer userId, @Param("timeStart") Long timeStart);
}
