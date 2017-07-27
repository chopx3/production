package ru.avito.model;

import javax.persistence.*;


@Entity
@Table(name="premium_clients")
public class PremiumClient {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "avito_id")
    private Long avitoId;

    @Column(name = "username")
    private String username;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(name = "comments")
    private String comments;

    @Column(name = "adm_phone")
    private Long admPhone;

    @Column(name = "contact_phone")
    private Long contactPhone;

    @Column(name = "additional_phones")
    private String additionalPhones;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "field")
    private String field;

    public PremiumClient() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Long getAvitoId() {return avitoId;}

    public void setAvitoId(Long avitoId) {this.avitoId = avitoId;}

    public String getUsername() {return username;}

    public void setUsername(String username) {this.username = username;}

    public String getContactPerson() {return contactPerson;}

    public void setContactPerson(String contactPerson) {this.contactPerson = contactPerson;}

    public String getComments() {return comments;}

    public void setComments(String comments) {this.comments = comments;}

    public Long getAdmPhone() {return admPhone;}

    public void setAdmPhone(Long admPhone) {this.admPhone = admPhone;}

    public Long getContactPhone() {return contactPhone;}

    public void setContactPhone(Long contactPhone) {this.contactPhone = contactPhone;}

    public String getAdditionalPhones() {return additionalPhones;}

    public void setAdditionalPhones(String additionalPhones) {this.additionalPhones = additionalPhones;}

    public Boolean getActive() {return active;}

    public void setActive(Boolean active) {this.active = active;}

    public String getField() {return field;}

    public void setField(String field) {this.field = field;}
}
