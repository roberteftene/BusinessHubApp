package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "user_details")
@Getter
@Setter
public class UserDetailsModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Integer uId;

    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "birthday")
    private String birthday;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "useraccount_id",referencedColumnName = "id")
    @JsonIgnore
    private UserAccountModel userAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_id", referencedColumnName = "subscription_id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private SubscriptionModel subscriptionModel;

    public UserDetailsModel() {}

    public UserDetailsModel(String firstName, String lastName, String birthday, int subscriptionId, int likedServiceId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
    }

    public UserDetailsModel(String firstName, String lastName, String birthday, UserAccountModel userAccount, SubscriptionModel subscriptionModel) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.userAccount = userAccount;
        this.subscriptionModel = subscriptionModel;
    }
}
