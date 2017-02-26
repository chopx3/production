package ru.avito.model.agent;

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
    private String password;

    @Column(name = "oktell_login")
    private String oktellLogin;

    @ManyToMany
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id"))
    Set<Role> roles;

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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "Agent{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", oktellLogin='" + oktellLogin + '\'' +
                ", roles=" + roles +
                '}';
    }
}
