package ru.avito.web;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import ru.avito.model.StatModel;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.Date;



/**
 * Created by Dmitriy on 02.08.2016.
 */

@Path("stat")
public class Stat {

    /*
        TODO Тут шляпа, надо убрать повторную логику.
     */

    private final static Logger LOG = LogManager.getLogger();
    private final static Marker SQL_EXCEPTION = MarkerManager.getMarker("SQL_EXCEPTION");
    private final static Marker STAT = MarkerManager.getMarker("STAT");

    /**
     * Получение колличества обращений по категориям
     */

    @GET
    @Path("category")
    @Produces (MediaType.TEXT_HTML)

    public String getTotalCallsByCategory(
             @QueryParam("from") String from
            ,@QueryParam("to") String to
    ) {
        return  executeQueryByName("category", from, to);
    }

    /**
     * Получение обращений от пользователей (ТОП)
     */

    @GET
    @Path("users")
    @Produces (MediaType.TEXT_HTML)

    public String getTotalCallsByUser(
             @QueryParam("from") String from
            ,@QueryParam("to") String to)
    {

        return executeQueryByName("users", from, to);
    }

    /**
     * Получение обращений с менеджером по категориям.
     */

    @GET
    @Path("managers")
    @Produces (MediaType.TEXT_HTML)

    public String getTotalCallsByManager(
            @QueryParam("from") String from
            ,@QueryParam("to") String to)
    {
        return executeQueryByName("managers", from, to);
    }

    /**
     * Получение обращений по категории вопроса.
     */

    @GET
    @Path("questions")
    @Produces (MediaType.TEXT_HTML)

    public String getTotalQuestions(
            @QueryParam("from") String from
            ,@QueryParam("to") String to)
    {
        return executeQueryByName("questions", from, to);
    }


    /**
     * Получение обращений по исходящим звонкам.
     */

    @GET
    @Path("outcoming")
    @Produces (MediaType.TEXT_HTML)

    public String getTotalOutcomingCalls(
            @QueryParam("from") String from
            ,@QueryParam("to") String to)
    {
        return executeQueryByName("outcoming", from, to);
    }


    @GET
    @Path("emptycalls")
    @Produces (MediaType.TEXT_HTML)

    public String getEmptyCalls(
            @QueryParam("from") String from
            ,@QueryParam("to") String to)
    {
        return executeQueryByName("emptycalls", from, to);
    }
            //TODO все что выше можно удалить. Перед этим отредактить ссылки запроса на фронте
    @GET
    @Path("byname")
    @Produces (MediaType.TEXT_HTML)
    public String executeQueryByName(
            @QueryParam("name") String name,
            @QueryParam("from") String from,
            @QueryParam("to") String to){

        String result="";
        Long[] period = getPeriod(from, to);

        try {

            if(LOG.isDebugEnabled())
            LOG.debug(STAT, String.format("Switch query by name: %s", name));

        switch (name) {

                case "managers":
                    result = StatModel.getTotalCallsByManager(period[0], period[1]);
                    break;

                case "category":
                    result = StatModel.getTotalCallsByCategory(period[0], period[1]);
                    break;

                case "users":
                    result = StatModel.getTotalCallsByUser(period[0], period[1]);
                    break;

                case "outcoming":
                    result = StatModel.getTotalOutcoming(period[0], period[1]);
                    break;

                case "questions":
                    result = StatModel.getTotalQuestions(period[0], period[1]);
                    break;

                case "emptycalls":
                    result = StatModel.getEmptyCallsByAgent(period[0], period[1]);
                    break;
        }
        }catch (SQLException e){
            LOG.error(SQL_EXCEPTION, String.format("Message: %s, Description: %s", e.getMessage(), e.toString()));
        }
        if(LOG.isDebugEnabled())
            LOG.debug(STAT, String.format("Name: %s, Results: %s", name, result));
        return result;
    }

    private Long[] getPeriod(String from, String to){ //TODO подумать че сделать с этим...

        Long[] period = new Long[2];

        if(from != null){
            String[] arrayFrom = from.split("-");
            Calendar fromDate = Calendar.getInstance();
            fromDate.set( Integer.valueOf(arrayFrom[2]),
                          Integer.valueOf(arrayFrom[1])-1,
                          Integer.valueOf(arrayFrom[0]),0,0,0);

                period[0] =fromDate.getTimeInMillis()+10800000;

        } else {
            period[0] = new Long(0);
        }

        if (to != null ) {
            String[] arrayTo = to.split("-");
            Calendar toDate = Calendar.getInstance();

            toDate.set( Integer.valueOf(arrayTo[2]),
                        Integer.valueOf(arrayTo[1])-1,
                        Integer.valueOf(arrayTo[0]),0,0,0);

            period[1] =toDate.getTimeInMillis()+10800000;

        } else {
            period[1] = new Date().getTime();
        }
        return period;
    }
}