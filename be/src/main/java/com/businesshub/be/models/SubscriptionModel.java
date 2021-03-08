package com.businesshub.be.models;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "subscription")
@Data
public class SubscriptionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "subscription_id")
    private Integer subscriptionId;

    @Column(name = "type")
    private String subscriptionType;
    @Column(name = "price")
    private double subscriptionPrice;
    @Column(name = "description")
    private String subscriptionDescription;

    public SubscriptionModel() {
    }

    public SubscriptionModel(String subscriptionType, double subscriptionPrice, String subscriptionDescription) {
        this.subscriptionType = subscriptionType;
        this.subscriptionPrice = subscriptionPrice;
        this.subscriptionDescription = subscriptionDescription;
    }
}
