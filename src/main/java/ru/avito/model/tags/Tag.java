package ru.avito.model.tags;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Dmitriy on 21.02.2017.
 */

@Entity
@Table(name = "tags")
public class Tag implements Comparable<Tag> {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "value")
    private String value;

    @Column(name = "description")
    private String description;

    @ManyToMany
    @OrderBy("id ASC")
    @JoinTable(name ="taggroup_tags", joinColumns = @JoinColumn(name = "tag_id"),
            inverseJoinColumns = @JoinColumn(name = "tagGroup_id"))
    @JsonIgnore
    private Set<TagGroup> tagGroups;

    public Tag() {
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

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<TagGroup> getTagGroups() {
        return tagGroups;
    }

    public void setTagGroups(Set<TagGroup> tagGroups) {
        this.tagGroups = tagGroups;
    }

    @Override
    public int compareTo(Tag o) {
        return this.id > o.getId() ? 1 : this.id < o.getId() ? -1 : 0;
    }
}

