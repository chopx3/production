package ru.avito.repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import ru.avito.model.calls.Call;
import ru.avito.model.calls.EmptyCall;
import ru.avito.model.tags.Tag;

import javax.ws.rs.QueryParam;
import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface CallRepository extends JpaRepository<Call,Integer>{ //TODO реализовать репозиторий


        @Query(name = "SELECT username, chain_id, com_id, time_begin " +
                "FROM calls JOIN users ON calls.user_id = users.id " +//TODO поправить
                "WHERE user_id = :agentId " +
                "AND time_begin BETWEEN :timeStart AND :timeEnd " +
                "ORDER BY time_begin ASC")
        List<Call> findByAgentIdAndTimeStartBetween(@Param("agentId") Integer agentId,
                                        @Param("timeStart") Long timeStart,
                                        @Param("timeEnd") Long timeEnd);

    @Modifying
    @Query(value = "UPDATE Call c " +
            "SET c.avitoUserId = :avitoUserId, c.questionId = :questionId, c.shopCategoryId = :shopCategoryId, " +
            "c.isManager = :isManager, c.type = :type " +
            "WHERE c.id IN (:ids)")
    Integer updateParamsForEmptyCall(@Param("avitoUserId") Long avitoUserId,//TODO тегов нет
                                @Param("questionId") Integer questionId,
                                @Param("shopCategoryId") Integer shopCategoryId,
                                @Param("isManager") Boolean isManager,
                                @Param("type") String type,
                                @Param("ids") List<Integer> ids);

    @Query(name ="SELECT * FROM calls WHERE timeStart > :timeStart and user_id =:agentId and type =:typeCall")
    List<Call> findByTimeStartGreaterThanAndAgentIdAndType(@Param("timeStart") Long timeStart,
                                                           @Param("agentId") Integer agentId,
                                                           @Param("typeCall") String typeCall);


    @Query(name ="SELECT * FROM calls WHERE chain_id > :chainId and user_id= :agentId")
    List<Call> findByChainIdAndAgentId(@Param("chainId") String chainId, @Param("agentId")Integer agentId);


//    @Query(name ="SELECT DISTINCT (id), avito_link, user_id, com_id, comments, time_begin " +
//                 "FROM calls INNER JOIN calls_tags ON calls.id = calls_tags.call_id " +
//                 "WHERE tag_id in: tagIds")
//    List<Call> findByTags(@Param("tagIds") List<Tag> tagIds);


    @Query("SELECT c FROM Call c INNER JOIN c.tags t WHERE t IN (:tags)")
    List<Call> findByTags(@Param("tags") List<Tag> tags);


    @Query(name = "SELECT * FROM calls WHERE user_id = :avitoUserId")
    List<Call> findByAvitoUserId(@Param("avitoUserId") Long avitoUserId, Pageable aPage);

    @Query("SELECT c FROM Call c WHERE c.questionId IN (:ids) AND c.timeStart BETWEEN :timeStart AND :timeEnd")
    List<Call> findByQuestionIdAndTimeStartBetween(@Param("ids") List<Integer> ids,
                                                   @Param("timeStart") Long timeStart,
                                                   @Param("timeEnd") Long timeEnd);
}
