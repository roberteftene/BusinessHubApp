package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

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
    @Column(name = "category")
    private EServiceCategory category;
    @Column(name = "location")
    private String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private UserAccountModel userAccount;

    @OneToMany(cascade = CascadeType.ALL)
    private List<WorkingHoursModel> workingHoursList;

    public ServiceModel() {
    }

    public ServiceModel(String serviceName, String serviceEmail, String servicePhone, String serviceDescription,UserAccountModel userAccountModel) {
        this.serviceName = serviceName;
        this.serviceEmail = serviceEmail;
        this.servicePhone = servicePhone;
        this.serviceDescription = serviceDescription;
        this.userAccount = userAccountModel;
    }

    public ServiceModel(String serviceName, String serviceEmail, String servicePhone, String serviceDescription, EServiceCategory category, String location, UserAccountModel userAccount, List<WorkingHoursModel> workingHoursList) {
        this.serviceName = serviceName;
        this.serviceEmail = serviceEmail;
        this.servicePhone = servicePhone;
        this.serviceDescription = serviceDescription;
        this.category = category;
        this.location = location;
        this.userAccount = userAccount;
        this.workingHoursList = workingHoursList;
    }
}
