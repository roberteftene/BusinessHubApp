package com.businesshub.be.models;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "user_entity")
@Data
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer uid;

    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;

    private String birthday;
    private int userRole;
    private int subscriptionId;
    private int likedServiceId;


    public UserModel() {}

    public UserModel(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
