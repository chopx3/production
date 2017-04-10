package ru.avito.services;

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
    Call findOne(Integer id);
    List<Call> findByAgentIdAndTimeStartBetween(Integer userId, Long timeStart, Long timeEnd);
    List<Call> findByTimeStartGreaterThanAndAgentIdAndType(Integer agentId, String typeCall);
    List<Call> findByTags(List<Tag> tagsIds);
    List<Call> findByAvitoUserId(Long avitoUserId);

}
