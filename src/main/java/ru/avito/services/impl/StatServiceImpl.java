package ru.avito.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import ru.avito.services.StatService;
import ru.avito.statdao.StatDao;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

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


    public String findTotalCallsByAgent(Long timeStart, Long timeEnd) {
        return statDao.findTotalCallsByAgent(timeStart, timeEnd);
    }

    @Override
    public String findTotalEmptyCallsByAgent(Long timeStart, Long timeEnd) {
        return statDao.findTotalEmptyCallsByAgent(timeStart, timeEnd);
    }
}
