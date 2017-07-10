package ru.avito.model;

import javax.persistence.*;

/**
 * Created by Dmitriy on 07.04.2017.
 */

@Entity
@Table(name = "question")
public class Question {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "description")
    private String description;

    @Column(name = "isActive")
    private boolean isActive;

    @Column(name = "shortName")
    private String shortName;

    public Question() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isActive() {return isActive;}

    public void setActive(boolean active) {isActive = active;}

    public String getShortName() {return shortName;}

    public void setShortName(String shortName) {this.shortName = shortName;}
}
