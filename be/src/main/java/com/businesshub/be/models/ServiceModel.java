package com.businesshub.be.models;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "service")
@Data
public class ServiceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "service_id")
    private Integer serviceId;

    @Column(name = "name")
    private String serviceName;
    @Column(name = "email")
    private String serviceEmail;
    @Column(name = "phone")
    private String servicePhone;
    @Column(name = "description")
    private String serviceDescription;
    private Integer userId;

    public ServiceModel() {
    }

    public ServiceModel(String serviceName, String serviceEmail, String servicePhone, String serviceDescription, Integer userId) {
        this.serviceName = serviceName;
        this.serviceEmail = serviceEmail;
        this.servicePhone = servicePhone;
        this.serviceDescription = serviceDescription;
        this.userId = userId;
    }
}
