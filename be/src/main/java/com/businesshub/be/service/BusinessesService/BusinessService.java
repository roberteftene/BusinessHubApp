package com.businesshub.be.service.BusinessesService;

import com.businesshub.be.exceptions.MissingSubscriptionException;
import com.businesshub.be.models.ServiceModel;
import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.models.UserDetailsModel;
import com.businesshub.be.models.WorkingHoursModel;
import com.businesshub.be.repository.ServiceRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
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


}
