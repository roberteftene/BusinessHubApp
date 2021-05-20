package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity(name = "service")
@Data
public class ServiceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(name = "address")
    private String address;
    @Column(name = "city")
    private String city;
    @Column(name = "rating")
    private float rating;

    @Transient
    private double popularityIndex;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private UserAccountModel userAccount;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<WorkingHoursModel> workingHoursList;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<ReviewModel> reviewModelList;

    public ServiceModel() {
    }

    public ServiceModel(String serviceName, String serviceEmail, String servicePhone, String serviceDescription, EServiceCategory category, String address, String city, float rating, UserAccountModel userAccount) {
        this.serviceName = serviceName;
        this.serviceEmail = serviceEmail;
        this.servicePhone = servicePhone;
        this.serviceDescription = serviceDescription;
        this.category = category;
        this.address = address;
        this.city = city;
        this.rating = rating;
        this.userAccount = userAccount;
    }

    public ServiceModel(String serviceName, String serviceEmail, String servicePhone, String serviceDescription, EServiceCategory category, String address, String city, float rating, List<WorkingHoursModel> workingHoursList, List<ReviewModel> reviewModelList) {
        this.serviceName = serviceName;
        this.serviceEmail = serviceEmail;
        this.servicePhone = servicePhone;
        this.serviceDescription = serviceDescription;
        this.category = category;
        this.address = address;
        this.city = city;
        this.rating = rating;
        this.workingHoursList = workingHoursList;
        this.reviewModelList = reviewModelList;
    }

    public float computeRating() {
        int sumOfRatings = 0;
        for (ReviewModel reviewModel : this.reviewModelList) {
            sumOfRatings += reviewModel.getReviewRating();
        }
        return (float)sumOfRatings / this.reviewModelList.size();
    }


}
