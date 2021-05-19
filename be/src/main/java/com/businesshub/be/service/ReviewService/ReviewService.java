package com.businesshub.be.service.ReviewService;

import com.businesshub.be.models.ReviewModel;
import com.businesshub.be.models.ServiceModel;
import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.repository.ReviewRepository;
import com.businesshub.be.repository.ServiceRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    UserRepository userRepository;

    public ReviewModel saveReview(Long userId,int serviceId, ReviewModel reviewModel) {
        ServiceModel serviceModel = serviceRepository.findById(serviceId).get();
        UserAccountModel userAccountModel = userRepository.findById(userId).get();
        if(serviceModel == null) {
            throw new UnsupportedOperationException("Service not found");
        }
        serviceModel.getReviewModelList().add(reviewModel);
        reviewModel.setUserAccount(userAccountModel);
        reviewModel.setReviewDate(new Date());
        float oldRating = serviceModel.getRating();
        float newRating = (oldRating + reviewModel.getReviewRating()) / serviceModel.getReviewModelList().size();
        serviceModel.setRating(newRating);
        reviewModel.setServiceModel(serviceModel);
        reviewRepository.save(reviewModel);
        return reviewModel;
    }

    public ReviewModel saveReviewWithGuestRole(int serviceId, ReviewModel reviewModel) {
        ServiceModel serviceModel = serviceRepository.findById(serviceId).get();
        if(serviceModel == null) {
            throw new UnsupportedOperationException("Service not found");
        }
        serviceModel.getReviewModelList().add(reviewModel);
        reviewModel.setReviewDate(new Date());
        float oldRating = serviceModel.getRating();
        float newRating = (oldRating + reviewModel.getReviewRating()) / serviceModel.getReviewModelList().size();
        serviceModel.setRating(newRating);
        reviewModel.setServiceModel(serviceModel);
        reviewRepository.save(reviewModel);
        return reviewModel;
    }

}
