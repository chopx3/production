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
 * Created by Dmitriy on 18.04.2017.
 */
public class NestedCategoryDaoImpl implements NestedCategoryDao{

    @Autowired
    BasicDataSource dataSource;

    public String findCategoryItemsMap(){
        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    "SELECT CONCAT( REPEAT('*', COUNT(parent.name) - 1), node.name) AS Field, " +
                            "COUNT(parent.name)-1 As Total " +
                            "FROM nested_category AS node, " +
                            "nested_category AS parent " +
                            "WHERE node.lft BETWEEN parent.lft AND parent.rgt " +
                            "GROUP BY node.name " +
                            "ORDER BY node.lft ASC");
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "Field", "Total");
            System.out.println(getClass()+" "+result);
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

    public String findCategoryDeptMap(){

        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                            "SELECT node.name AS field, COUNT(parent.name)-1 As parentId " +
                            "FROM nested_category AS node, " +
                            "  nested_category AS parent " +
                            "WHERE node.lft BETWEEN parent.lft AND parent.rgt " +
                            "GROUP BY node.name " +
                            "ORDER BY node.lft ASC");
            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "field", "parentId");
            System.out.println(getClass()+" "+result);
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
        return result;}

    public String findParentIdByChild(String childName){
        Connection connection = null;
        String result = null;
        try {
            connection = dataSource.getConnection();
            PreparedStatement p =connection.prepareStatement(
                    "SELECT name, (SELECT t2.name " +
                            "FROM nested_category t2 " +
                            "WHERE t2.lft < t1.lft AND t2.rgt > t1.rgt " +
                            "ORDER BY t2.rgt-t1.rgt ASC LIMIT 1) AS field, " +
                                "(SELECT t2.category_id " +
                                "FROM nested_category t2 " +
                                "WHERE t2.lft < t1.lft AND t2.rgt > t1.rgt " +
                                "ORDER BY t2.rgt-t1.rgt ASC LIMIT 1) AS parents " +
                            "FROM nested_category t1 WHERE name =?");
            p.setString(1, childName);

            ResultSet resultSet = p.executeQuery();
            result = convert(resultSet, "field", "parents");
            System.out.println(getClass()+" "+result);
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
