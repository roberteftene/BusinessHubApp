package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity(name = "review")
@Data
public class ReviewModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "review_id")
    private Integer reviewId;

    @Column(name = "title")
    private String reviewTitle;
    @Column(name = "no_likes")
    private int noLikes;
    @Column(name = "description")
    private String reviewDescription;
    @Column(name = "rating")
    private int reviewRating;
    @Column(name = "post_date")
    private Date reviewDate;
    @Column(name="visit_date")
    private String visitDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serviceId")
    @JsonIgnore
    @ToString.Exclude
    private ServiceModel serviceModel;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private UserAccountModel userAccount;

    public ReviewModel() {
    }

    public ReviewModel(String reviewTitle, int noLikes, String reviewDescription, int reviewRating,String visitDate) {
        this.reviewTitle = reviewTitle;
        this.noLikes = noLikes;
        this.reviewDescription = reviewDescription;
        this.reviewRating = reviewRating;
        this.visitDate = visitDate;
    }

}
