package ru.avito.services;

/**
 * Created by Dmitriy on 11.04.2017.
 */
public interface StatService {

     String findTotalCallsByShopCategory(Long timeStart, Long timeEnd);

     String findTotalCallsByCategoryAndAvitoUser(Long timeStart, Long timeEnd);

     String findTotalCallsByManager(Long timeStart, Long timeEnd);

     String findTotalCallsByQuestion(Long timeStart, Long timeEnd);

     String findTotalOutcomingCalls(Long timeStart, Long timeEnd);

     String findTotalCallsByAgent(Long timeStart, Long timeEnd);

     String findTotalCallsByCategoryAndAgent(Long timeStart, Long timeEnd, Integer agent);

     String findTotalCallsByAgentFFC(Long timeStart, Long timeEnd);

     String findTotalEmptyCallsByAgent(Long timeStart, Long timeEnd);

     String findFullAndEmptyCallsByAgent(Long timeStart, Long timeEnd);

    String findFullAndEmptyFeedbackByAgent(Long timeStart, Long timeEnd);
}
