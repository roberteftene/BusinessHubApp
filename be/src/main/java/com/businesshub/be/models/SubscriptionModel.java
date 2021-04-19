package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity(name = "subscription")
@Data
public class SubscriptionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "subscription_id")
    private Integer subscriptionId;

    @Column(name = "type")
    private String type;
    @Column(name = "price")
    private double subscriptionPrice;
    @Column(name = "description")
    private String subscriptionDescription;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserDetailsModel> userDetailsModelList;

    public SubscriptionModel() {
    }

    public SubscriptionModel(String subscriptionType, double subscriptionPrice, String subscriptionDescription) {
        this.type = subscriptionType;
        this.subscriptionPrice = subscriptionPrice;
        this.subscriptionDescription = subscriptionDescription;
    }

    public SubscriptionModel(String type, double subscriptionPrice, String subscriptionDescription, List<UserDetailsModel> userDetailsModelList) {
        this.type = type;
        this.subscriptionPrice = subscriptionPrice;
        this.subscriptionDescription = subscriptionDescription;
        this.userDetailsModelList = userDetailsModelList;
    }
}
