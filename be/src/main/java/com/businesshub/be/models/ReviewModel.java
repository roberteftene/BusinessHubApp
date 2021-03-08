package com.businesshub.be.models;

import lombok.Data;

import javax.persistence.*;

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
    private String reviewDate;
    private Integer userId;
    private Integer serviceId;

    public ReviewModel() {
    }

    public ReviewModel(String reviewTitle, int noLikes, String reviewDescription, int reviewRating, String reviewDate, int userId, int serviceId) {
        this.reviewTitle = reviewTitle;
        this.noLikes = noLikes;
        this.reviewDescription = reviewDescription;
        this.reviewRating = reviewRating;
        this.reviewDate = reviewDate;
        this.userId = userId;
        this.serviceId = serviceId;
    }
}
