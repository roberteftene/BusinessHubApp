package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private ESubscriptionType type;
    @Column(name = "price")
    private double subscriptionPrice;
    @Column(name = "description")
    private String subscriptionDescription;

    @OneToOne
    @JoinColumn(name = "useraccount_id",referencedColumnName = "id")
    @JsonIgnore
    private UserAccountModel userAccount;

    public SubscriptionModel() {
    }

    public SubscriptionModel(ESubscriptionType subscriptionType, double subscriptionPrice, String subscriptionDescription) {
        this.type = subscriptionType;
        this.subscriptionPrice = subscriptionPrice;
        this.subscriptionDescription = subscriptionDescription;
    }
}
