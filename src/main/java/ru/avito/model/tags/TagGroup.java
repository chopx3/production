package ru.avito.model.tags;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Dmitriy on 21.02.2017.
 */

@Entity
@Table(name = "taggroup")
public class TagGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany
    @JoinTable(name ="taggroup_tags", joinColumns = @JoinColumn(name = "taggroup"),
    inverseJoinColumns = @JoinColumn(name = "tags"))
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

    @Override
    public String toString() {
        return "TagGroup{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", tags=" + tags +
                '}';
    }
}
