package ru.avito.model.tags;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Dmitriy on 21.02.2017.
 */

@Entity
@Table(name = "taggroup")
public class TagGroup implements Comparable<TagGroup>{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name="description")
    private String description;

    @OrderBy("id ASC")
    @ManyToMany(mappedBy = "tagGroups")
    @JsonManagedReference
    Set<Tag> tags;

    public TagGroup() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public int compareTo(TagGroup o) {
        return this.id > o.getId() ? 1 : this.id < o.getId() ? -1 : 0;
    }
}
