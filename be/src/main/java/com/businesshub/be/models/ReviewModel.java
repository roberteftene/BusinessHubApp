package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serviceId")
    @JsonIgnore
    @ToString.Exclude
    private ServiceModel serviceModel;

    public ReviewModel() {
    }

    public ReviewModel(String reviewTitle, int noLikes, String reviewDescription, int reviewRating, String reviewDate) {
        this.reviewTitle = reviewTitle;
        this.noLikes = noLikes;
        this.reviewDescription = reviewDescription;
        this.reviewRating = reviewRating;
        this.reviewDate = reviewDate;
    }

}
