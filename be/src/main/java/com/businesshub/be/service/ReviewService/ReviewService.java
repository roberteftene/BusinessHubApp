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
import java.util.List;
import java.util.stream.Collectors;

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

        reviewModel.setReviewDate(new Date());
        reviewModel.setServiceModel(serviceModel);
        reviewModel.setUserAccount(userAccountModel);

        serviceModel.getReviewModelList().add(reviewModel);
        float newRating = serviceModel.computeRating();
        serviceModel.setRating(newRating);

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

    public List<ReviewModel> getReviewsByServiceId(int serviceId) {
        return reviewRepository.findAll()
        .stream()
        .filter(review -> review.getServiceModel().getServiceId() == serviceId)
        .collect(Collectors.toList());
    }

}
