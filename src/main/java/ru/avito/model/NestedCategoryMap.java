package ru.avito.model;

import javax.persistence.*;

/**
 * Created by Dmitriy on 18.04.2017.
 */
@Entity
@Table(name = "nested_category")
public class NestedCategoryMap  implements Comparable<NestedCategoryMap>{

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "level")
    private int level;

    @Column(name = "itemsCount")
    private int itemsCount;

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

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getItemsCount() {
        return itemsCount;
    }

    public void setItemsCount(int itemsCount) {
        this.itemsCount = itemsCount;
    }

    @Override
    public String toString() {
        return "NestedCategoryMap{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", level=" + level +
                ", itemsCount=" + itemsCount +
                '}';
    }

    @Override
    public int compareTo(NestedCategoryMap o) {
        return this.getLevel() > o.getLevel() ? 1 : this.getLevel() == o.getLevel() ? 0 : -1;
    }
}
