package ru.avito.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.services.StatService;
import ru.avito.dao.stat.StatDao;

/**
 * Created by Dmitriy on 11.04.2017.
 */
public class StatServiceImpl implements StatService {

    @Autowired
    private StatDao statDao;

    @Override
    public String findTotalCallsByShopCategory(Long timeStart, Long timeEnd) {
        return statDao.findTotalCallsByShopCategory(timeStart, timeEnd);
    }

    @Override
    public String findTotalCallsByCategoryAndAvitoUser(Long timeStart, Long timeEnd) {
        return statDao.findTotalCallsByCategoryAndAvitoUser(timeStart, timeEnd);
    }

    @Override
    public String findTotalCallsByManager(Long timeStart, Long timeEnd) {
        return statDao.findTotalCallsByManager(timeStart, timeEnd);
    }

    @Override
    public String findTotalCallsByQuestion(Long timeStart, Long timeEnd) {
        return statDao.findTotalCallsByQuestion(timeStart, timeEnd);
    }

    @Override
    public String findTotalOutcomingCalls(Long timeStart, Long timeEnd) {
        return statDao.findTotalOutcomingCalls(timeStart, timeEnd);
    }

    @Override
    public String findTotalCallsByAgent(Long timeStart, Long timeEnd) {
        return statDao.findTotalCallsByAgent(timeStart, timeEnd);
    }

    @Override
    public String findTotalCallsByAgentFFC(Long timeStart, Long timeEnd) {
        return statDao.findTotalCallsByAgentFFC(timeStart, timeEnd);
    }

    @Override
    public String findTotalEmptyCallsByAgent(Long timeStart, Long timeEnd) {
        return statDao.findTotalEmptyCallsByAgent(timeStart, timeEnd);
    }

    @Override
    public String findFullAndEmptyCallsByAgent(Long timeStart, Long timeEnd) {
        return statDao.findFullAndEmptyCallsByAgent(timeStart, timeEnd);
    }
    @Override
    public String findFullAndEmptyFeedbackByAgent(Long timeStart, Long timeEnd) {
        return statDao.findFullAndEmptyFeedbackByAgent(timeStart, timeEnd);
    }

}
