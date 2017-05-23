package ru.avito.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import ru.avito.model.calls.*;
import ru.avito.model.tags.Tag;

import java.util.List;

/**
 * Created by Dmitriy on 26.02.2017.
 */
public interface CallService { //TODO доделать

    List<Call> save(List<Call> calls);
    Integer save(UpdatedCall call);
    Integer save(FeedbackCall call);
    Call findOne(Integer id); //TODO понадобится в будущем для категорий
    List<Call> findByAgentIdAndTimeStartBetween(Integer userId, Long timeStart, Long timeEnd);
    List<Call> findByTimeStartBetweenAndAgentIdAndType(Integer agentId, Long startPeriod, Long endPeriod, String typeCall);
    List<Call> findByTags(List<Tag> tagsIds);
    List<Call> findByAvitoUserId(Long avitoUserId, PageRequest aPage);
    List<Call> findByQuestionIdAndTimeStartBetween(Integer ids, Long timeStart, Long timeEnd);
    List<Call> findByTimeStartBetweenAndType(Long timeStart, Long timeEnd, String typeCall);

}
