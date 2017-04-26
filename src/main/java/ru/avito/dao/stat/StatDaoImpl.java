package ru.avito.dao.stat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by Dmitriy on 11.04.2017.
 */
public class StatDaoImpl implements StatDao {

    @Autowired
    BasicDataSource dataSource;

    public String findTotalCallsByShopCategory(Long timeStart, Long timeEnd) {
        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    "SELECT shop_category.description AS Field, count(DISTINCT(calls.chain_id)) AS Total "+
                            "FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id "+
                            "WHERE shop_category_id = shop_category.id "+
                            "AND time_begin BETWEEN ? AND ? "+
                            "AND isOut = FALSE " +
                            "GROUP BY shop_category_id "+
                            "ORDER BY 2 DESC");

            p.setLong(1,timeStart);
            p.setLong(2,timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Field","Total");

        } catch (SQLException e) {
            System.out.println(e);
        }
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }
        return result;
    }

    @Override
    public String findTotalCallsByCategoryAndAvitoUser(Long timeStart, Long timeEnd) {
        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    "SELECT shop_category.description AS Field, calls.avito_link AS User_ID, count(DISTINCT(calls.chain_id)) AS Total "+
                    "FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id "+
                    "WHERE shop_category_id = shop_category.id "+
                    "AND time_begin BETWEEN ? AND ? "+
                    "GROUP BY avito_link "+
                    "ORDER BY 3 DESC");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Field","User_ID", "Total");
        } catch (SQLException e) {
            System.out.println(e);
        }
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }
        return result;
    }

    @Override
    public String findTotalCallsByManager(Long timeStart, Long timeEnd) {

        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    "SELECT shop_category.description AS Field, count(DISTINCT(calls.chain_id)) AS Total " +
                            "FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id " +
                            "WHERE shop_category_id = shop_category.id " +
                            "AND time_begin BETWEEN ? AND ? " +
                            "AND calls.isManager = TRUE " +
                            "GROUP BY shop_category_id " +
                            "ORDER BY 2 DESC");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Field", "Total");
        } catch (SQLException e) {
            System.out.println(e);
        }
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }

        return result;
    }

    @Override
    public String findTotalCallsByQuestion(Long timeStart, Long timeEnd) {
        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    "SELECT question.description AS Field, count(DISTINCT(chain_id)) As Total " +
                            "FROM calls JOIN question ON calls.question_id = question.id " +
                            "WHERE question_id=question.id " +
                            "AND time_begin BETWEEN ? AND ? " +
                            "GROUP BY question_id " +
                            "ORDER BY 2 DESC");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Field", "Total");
        } catch (SQLException e) {
            System.out.println(e);
        }
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }
        return result;
    }

    @Override
    public String findTotalOutcomingCalls(Long timeStart, Long timeEnd) {
        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    "SELECT shop_category.description AS Field, count(isOut) AS Total " +
                            "FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id " +
                            "WHERE  isOut = TRUE " +
                            "AND time_begin BETWEEN ? AND ? " +
                            "GROUP BY shop_category_id " +
                            "ORDER BY 2 DESC");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Field", "Total");
        } catch (SQLException e) {
            System.out.println(e);
        }
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }
        return result;
    }

    @Override
    public String findTotalEmptyCallsByAgent(Long timeStart, Long timeEnd) {

        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    " SELECT users.oktell_login AS Field, count(DISTINCT(chain_id)) AS Total " +
                            "FROM calls JOIN users ON calls.user_id = users.id " +
                            "WHERE type =\"EMPTY\" " +
                            "AND time_begin BETWEEN ? AND ? " +
                            "GROUP BY user_id " +
                            "ORDER BY 2 DESC");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Field", "Total");
        } catch (SQLException e) {
            System.out.println(e);
        }
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }
        return result;
    }

    @Override
    public String findTotalCallsByAgent(Long timeStart, Long timeEnd) {
        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    " SELECT users.oktell_login AS Field, count(DISTINCT(chain_id)) AS Total " +
                            "FROM calls JOIN users ON calls.user_id = users.id " +
                            "WHERE time_begin BETWEEN ? AND ? " +
                            "GROUP BY user_id " +
                            "ORDER BY 2 DESC");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Field", "Total");
        } catch (SQLException e) {
            System.out.println(e);
        }
        finally {
            try {
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }
        return result;
    }




    private String convert(ResultSet rs, String... columnsName) {
        String jsonStructure = "{\"fields\":%s, \"columns\":%s}";
        ObjectNode node = new ObjectMapper().createObjectNode();

        ArrayList<String> fields = new ArrayList<>();
        ArrayList<String> columns = new ArrayList<>();

        for (String cName : columnsName) {
            fields.add("\""+cName+"\"");
        }
        try {
            while (rs.next()) {
                for(int i=0; i <columnsName.length; i++)
                    node.put(columnsName[i].toLowerCase(), rs.getString(columnsName[i]));
                columns.add(node.toString());
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return String.format(jsonStructure, fields, columns);
    }

}