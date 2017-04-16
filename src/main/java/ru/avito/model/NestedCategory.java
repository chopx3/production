package ru.avito.model;

import javax.persistence.*;

@Entity
@Table(name = "nested_category")
@NamedStoredProcedureQueries({
@NamedStoredProcedureQuery(name = "addChildNode",
                            procedureName = "addChildNode",
                            parameters = {
                                    @StoredProcedureParameter(mode = ParameterMode.IN, name = "parentName", type = String.class),
                                    @StoredProcedureParameter(mode = ParameterMode.IN, name = "childName", type = String.class)
                            }),
@NamedStoredProcedureQuery(name = "deleteNode",
                            procedureName = "deleteNode",
                            parameters = {
                                    @StoredProcedureParameter(mode = ParameterMode.IN, name = "categoryName", type = String.class)
                            }
                            )})
public class NestedCategory {

    @Id
    @Column(name = "category_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "lft")
    private Integer left;

    @Column(name = "rgt")
    private Integer right;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getLeft() {
        return left;
    }

    public void setLeft(Integer left) {
        this.left = left;
    }

    public Integer getRight() {
        return right;
    }

    public void setRight(Integer right) {
        this.right = right;
    }


    @Override
    public String toString() {
        return "NestedCategory{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", left=" + left +
                ", right=" + right +
                '}';
    }
}
