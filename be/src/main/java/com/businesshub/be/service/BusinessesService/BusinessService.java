package com.businesshub.be.service.BusinessesService;

import com.businesshub.be.exceptions.MissingSubscriptionException;
import com.businesshub.be.models.*;
import com.businesshub.be.repository.ServiceRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BusinessService {

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    UserRepository userRepository;

    private static double noReviewsImportanceIndex = 0.4;
    private static double ratingImportanceIndex = 0.6;

    public ServiceModel addService(ServiceModel serviceModel, long userId) throws MissingSubscriptionException {
        UserAccountModel userAccountModel = userRepository.findById(userId).get();
        UserDetailsModel userDetailsModel = userAccountModel.getUserDetails();

        if (userDetailsModel.getSubscriptionModel() == null) {
            throw new MissingSubscriptionException("You must apply for a subscription");
        } else {
            serviceModel.setUserAccount(userAccountModel);
            List<WorkingHoursModel> workingHoursModels = serviceModel.getWorkingHoursList();
            if (workingHoursModels.equals(null)) {
                throw new NullPointerException("There is no working hour schedule");
            } else {
                workingHoursModels.forEach(workingHour -> workingHour.setServiceModel(serviceModel));
                serviceRepository.save(serviceModel);
                return serviceModel;
            }

        }

    }

    public List<ServiceModel> getAllServicesByUserId(long userId) {
        List<ServiceModel> allServices = serviceRepository.findAll();
        return allServices.stream().filter(service -> service.getUserAccount().getId() == userId).collect(Collectors.toList());
    }

    public List<ServiceModel> getAllServices() {
        return serviceRepository.findAll();
    }

    public List<ServiceModel> computeCommunityTop(double noReviewsImportanceIndex, double ratingImportanceIndex) {
        List<ServiceModel> services = new ArrayList<>();
        services.addAll(serviceRepository.findAll());

        for (ServiceModel service : services) {
            if (service.getReviewModelList().size() > 0) {
                double popularityIndex =
                        noReviewsImportanceIndex * Math.log10(service.getReviewModelList().size())
                                + ratingImportanceIndex * service.getRating();
                service.setPopularityIndex(popularityIndex);
            } else {
                service.setPopularityIndex(0);
            }

        }

        List<ServiceModel> communityTop = services.stream()
                .filter(service -> service.getPopularityIndex() > 0)
                .sorted(Comparator.comparingDouble(ServiceModel::getPopularityIndex).reversed())
                .collect(Collectors.toList());

        if (communityTop.size() > 3) {
            return communityTop.subList(0, 3);
        } else {
            return communityTop;
        }
    }

    public ServiceModel getServiceById(Integer id) {
        ServiceModel serviceModel = serviceRepository.findById(id).get();
        return serviceModel;
    }

    public Map<String,Integer> getReviewsDataForBarchartGraphic(int serviceId, EPeriod period) {
        List<ReviewModel> reviews = serviceRepository.findById(serviceId).get().getReviewModelList();
        List<ReviewModel> reviewForDesiredPeriod = new ArrayList<>();

        reviews.forEach(reviewModel -> {
            if (reviewModel.checkIfSamePeriod(period)) {
                reviewForDesiredPeriod.add(reviewModel);
            }
        });

        Map<String,Integer> reviewsByStars = new HashMap<>();
        int oneStarCounter = 0,
                twoStarCounter = 0,
                threeStarsCounter = 0,
                fourStarsCounter = 0,
                fiveStarsCounter = 0;

        for (ReviewModel reviewModel : reviewForDesiredPeriod) {
            switch (reviewModel.getReviewRating()) {
                case 5:
                    fiveStarsCounter++;
                    break;
                case 4:
                    fourStarsCounter++;
                    break;
                case 3:
                    threeStarsCounter++;
                    break;
                case 2:
                    twoStarCounter++;
                    break;
                case 1:
                    oneStarCounter++;
                    break;
            }

        }

        reviewsByStars.put(EGraphicRatingAxis.FIVE_STAR.toString(), fiveStarsCounter);
        reviewsByStars.put(EGraphicRatingAxis.FOUR_STAR.toString(),fourStarsCounter);
        reviewsByStars.put(EGraphicRatingAxis.THREE_STAR.toString(),threeStarsCounter);
        reviewsByStars.put(EGraphicRatingAxis.TWO_STAR.toString(),twoStarCounter);
        reviewsByStars.put(EGraphicRatingAxis.ONE_STAR.toString(),oneStarCounter);

        return  reviewsByStars;

    }


}
