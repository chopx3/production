package ru.avito.model.agent;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonBackReference;
import ru.avito.model.calls.Call;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Dmitriy on 30.12.2016.
 */
@Entity
@Table(name = "users")
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name= "password")
    @JsonIgnore
    private String password;

    @Column(name = "oktell_login")
    private String oktellLogin;

    @Column(name = "notes")
    private String notes;


    @ManyToMany
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

//    @OneToMany(cascade = CascadeType.ALL, mappedBy = "agent")
//    @JsonBackReference
//    private Set<Call> calls; //TODO затестить не сломалось ли чего?

    public Agent() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOktellLogin() {
        return oktellLogin;
    }

    public void setOktellLogin(String oktellLlogin) {
        this.oktellLogin = oktellLogin;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

//    public Set<Call> getCalls() {
//        return calls;
//    }
//
//    public void setCalls(Set<Call> calls) {
//        this.calls = calls;
//    }
}
