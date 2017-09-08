package ru.avito.model;

import javax.persistence.*;

@Entity
@Table(name="angryusers")
public class AngryUser {

    @Column(name = "email")
    private String email;

    @Column(name = "ticket")
    private Integer ticket;

    @Id
    @Column(name = "avitoid")
    private Integer avitoid;

    @Column(name = "active")
    private Boolean active;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getTicket() {
        return ticket;
    }

    public void setTicket(Integer ticket) {
        this.ticket = ticket;
    }

    public Integer getAvitoid() {
        return avitoid;
    }

    public void setAvitoid(Integer avitoid) {
        this.avitoid = avitoid;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
