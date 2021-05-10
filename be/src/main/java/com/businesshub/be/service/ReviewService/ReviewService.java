package com.businesshub.be.service.ReviewService;

import com.businesshub.be.models.ReviewModel;
import com.businesshub.be.models.ServiceModel;
import com.businesshub.be.repository.ReviewRepository;
import com.businesshub.be.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    ServiceRepository serviceRepository;

    public ReviewModel saveReview(int serviceId, ReviewModel reviewModel) {
        ServiceModel serviceModel = serviceRepository.findById(serviceId).get();
        if(serviceModel == null) {
            throw new UnsupportedOperationException("Service not found");
        }
        serviceModel.getReviewModelList().add(reviewModel);
        float oldRating = serviceModel.getRating();
        float newRating = (oldRating + reviewModel.getReviewRating()) / serviceModel.getReviewModelList().size();
        serviceModel.setRating(newRating);
        reviewModel.setServiceModel(serviceModel);
        reviewRepository.save(reviewModel);
        return reviewModel;
    }

}
