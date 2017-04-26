package ru.avito.dao.repository;


import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.avito.model.calls.Call;
import ru.avito.model.tags.Tag;
import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface CallRepository extends JpaRepository<Call,Integer>{ //TODO реализовать репозиторий


    List<Call> findByAgentIdAndTimeStartBetween(Integer agentId, Long timeStart, Long timeEnd);

    List<Call> findByTimeStartBetweenAndAgentIdAndType(Long timeStart, Long timeEnd, Integer agentId, String typeCall);

    List<Call> findByTimeStartBetweenAndType(Long timeStart, Long timeEnd, String typeCall);

    List<Call> findByChainIdAndAgentId(String chainId, Integer agentId);

    List<Call> findByAvitoUserId(Long avitoUserId, Pageable aPage);

    @Query("SELECT c FROM Call c INNER JOIN c.tags t WHERE t IN (:tags)")
    List<Call> findByTags(@Param("tags") List<Tag> tags);

    @Query("SELECT c FROM Call c WHERE c.questionId IN (:ids) AND c.timeStart BETWEEN :timeStart AND :timeEnd")
    List<Call> findByQuestionIdAndTimeStartBetween(@Param("ids") List<Integer> ids,
                                                   @Param("timeStart") Long timeStart,
                                                   @Param("timeEnd") Long timeEnd);
}