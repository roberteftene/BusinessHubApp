package com.businesshub.be.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "liked_service")
@Data
public class LikedServiceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer userId;
    private Integer serviceId;

    public LikedServiceModel() {
    }

    public LikedServiceModel(Integer userId, Integer serviceId) {
        this.userId = userId;
        this.serviceId = serviceId;
    }
}
