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

    @Column(name = "active")
    private Boolean active;

    @Column(name = "shortName")
    private String shortName;

    @Column(name = "position")
    private String position;

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

    public Boolean getActive() {        return active;    }

    public void setActive(Boolean active) {        this.active = active;    }

    public String getShortName() {return shortName;}

    public void setShortName(String shortName) {this.shortName = shortName;}

    public String getPosition() { return position; }

    public void setPosition(String position) { this.position = position; }
}
