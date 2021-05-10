package com.businesshub.be.payload.request;

public class CommunityImportanceTop {
    private double noReviewsImportanceIndex;
    private double ratingImportanceIndex;

    public CommunityImportanceTop(double noReviewsImportanceIndex, double ratingImportanceIndex) {
        this.noReviewsImportanceIndex = noReviewsImportanceIndex;
        this.ratingImportanceIndex = ratingImportanceIndex;
    }

    public double getNoReviewsImportanceIndex() {
        return noReviewsImportanceIndex;
    }

    public void setNoReviewsImportanceIndex(double noReviewsImportanceIndex) {
        this.noReviewsImportanceIndex = noReviewsImportanceIndex;
    }

    public double getRatingImportanceIndex() {
        return ratingImportanceIndex;
    }

    public void setRatingImportanceIndex(double ratingImportanceIndex) {
        this.ratingImportanceIndex = ratingImportanceIndex;
    }
}
