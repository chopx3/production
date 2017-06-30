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
                    "SELECT shop_category.description AS Category, count(DISTINCT(calls.chain_id)) AS Total "+
                            "FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id "+
                            "WHERE shop_category_id = shop_category.id "+
                            "AND time_begin BETWEEN ? AND ? "+
                            "AND isOut = FALSE " +
                            "GROUP BY shop_category_id "+
                            "ORDER BY 2 DESC");

            p.setLong(1,timeStart);
            p.setLong(2,timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Category","Total");

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
                    "SELECT shop_category.description AS Category, count(DISTINCT(calls.chain_id)) AS Total, calls.avito_link AS ID "+
                    "FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id "+
                    "WHERE shop_category_id = shop_category.id "+
                    "AND time_begin BETWEEN ? AND ? "+
                    "GROUP BY avito_link "+
                    "ORDER BY 2 DESC");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Category", "Total" ,"ID");
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
                    "SELECT shop_category.description AS Category, count(DISTINCT(calls.chain_id)) AS Total " +
                            "FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id " +
                            "WHERE shop_category_id = shop_category.id " +
                            "AND time_begin BETWEEN ? AND ? " +
                            "AND calls.isManager = TRUE " +
                            "GROUP BY shop_category_id " +
                            "ORDER BY 2 DESC");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Category", "Total");
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
                    "SELECT question.id AS Question, count(DISTINCT(chain_id)) As Total " +
                            "FROM calls JOIN question ON calls.question_id = question.id " +
                            "WHERE question_id=question.id " +
                            "AND time_begin BETWEEN ? AND ? " +
                            "GROUP BY question_id " +
                            "ORDER BY 2 DESC");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Question", "Total");
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
                    "SELECT shop_category.description AS Category, count(isOut) AS Total " +
                            "FROM calls JOIN shop_category ON calls.shop_category_id = shop_category.id " +
                            "WHERE  isOut = TRUE " +
                            "AND time_begin BETWEEN ? AND ? " +
                            "GROUP BY shop_category_id " +
                            "ORDER BY 2 DESC");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Category", "Total");
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
                            " AND department = 'pro' " +
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
                            " AND department = 'pro' " +
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
    public String findTotalCallsByAgentFFC(Long timeStart, Long timeEnd) {
        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    " SELECT users.oktell_login AS Field, count(DISTINCT(chain_id)) AS Total " +
                            "FROM calls JOIN users ON calls.user_id = users.id " +
                            "WHERE time_begin BETWEEN ? AND ? " +
                            " AND department = 'ffc' " +
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
    public String findFullAndEmptyCallsByAgent(Long timeStart, Long timeEnd) {
        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    "select t1.agent, t1.total, coalesce(t2.empty, 0) as empty " +
                            "from (SELECT users.oktell_login AS 'agent', count(DISTINCT(chain_id)) AS total " +
                            "FROM calls JOIN users ON calls.user_id = users.id " +
                            "AND time_begin BETWEEN ? AND ? " +
                            " AND department = 'pro' " +
                            "GROUP BY user_id " +
                            "ORDER BY 2 DESC) as t1 " +
                            "left join" +
                            "(SELECT users.oktell_login AS 'agent', count(DISTINCT(chain_id)) AS empty " +
                            "FROM calls JOIN users ON calls.user_id = users.id " +
                            "WHERE type =\"EMPTY\" " +
                            "AND time_begin BETWEEN ? AND ? " +
                            " AND department = 'pro' " +
                            "GROUP BY user_id " +
                            "ORDER BY 2 DESC) as t2 " +
                            "on t1.agent = t2.agent;");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            p.setLong(3, timeStart);
            p.setLong(4, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "agent", "total", "empty");
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
    public String findFullAndEmptyFeedbackByAgent(Long timeStart, Long timeEnd) {
        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    "select t1.Agent, (t1.Full_feedback+coalesce(t2.Empty_feedback, 0)) as Total, coalesce(t2.Empty_feedback, 0) AS Empty "+
                    "FROM (SELECT users.oktell_login AS 'Agent', count(DISTINCT(chain_id)) AS 'Full_feedback' "+
                    "FROM calls JOIN users ON calls.user_id = users.id "+
                    " WHERE type =\"FULL_FEEDBACK\" "+
                    " AND time_begin BETWEEN ? AND ?  "+
                            " AND department = 'pro' " +
                    " GROUP BY user_id "+
                    "ORDER BY 2 DESC) as t1 "+
                    "left join "+
                    "(SELECT users.oktell_login AS 'Agent', count(DISTINCT(chain_id)) AS 'Empty_feedback' "+
                    "FROM calls JOIN users ON calls.user_id = users.id "+
                    "WHERE type =\"EMPTY_FEEDBACK\" "+
                    "AND time_begin BETWEEN ? AND ? "+
                    " GROUP BY user_id "+
                    "ORDER BY 2 DESC) as t2 "+
                    "on t1.Agent = t2.Agent;");

            p.setLong(1, timeStart);
            p.setLong(2, timeEnd);
            p.setLong(3, timeStart);
            p.setLong(4, timeEnd);
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Agent", "Total", "Empty");
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
