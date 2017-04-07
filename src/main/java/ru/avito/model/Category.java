package ru.avito.model;

import javax.persistence.*;

/**
 * Created by Dmitriy on 07.04.2017.
 */

@Entity
@Table(name="shop_category") //TODO переименовать таблицу в БД
public class Category {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;

    @Column(name = "description")
    private String description;

    public Category() {
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
