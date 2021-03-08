package com.businesshub.be.models;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "order_item")
@Data
public class OrderModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "content")
    private String orderContent;
    @Column(name = "status")
    private String orderStatus;
    @Column(name = "price")
    private double orderPrice;

    private Integer userId;
    private Integer serviceId;

    public OrderModel() {
    }

    public OrderModel(String orderContent, String orderStatus, double orderPrice, Integer userId, Integer serviceId) {
        this.orderContent = orderContent;
        this.orderStatus = orderStatus;
        this.orderPrice = orderPrice;
        this.userId = userId;
        this.serviceId = serviceId;
    }
}
