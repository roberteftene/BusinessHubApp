package com.businesshub.be.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "user_entity")
@Getter
@Setter
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Integer uId;

    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "birthday")
    private String birthday;
    @Column(name = "role")
    private int userRole;

    private Integer subscriptionId;
    private Integer likedServiceId;

    public UserModel() {}

    public UserModel(String firstName, String lastName, String birthday, int userRole, int subscriptionId, int likedServiceId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.userRole = userRole;
        this.subscriptionId = subscriptionId;
        this.likedServiceId = likedServiceId;
    }
}
