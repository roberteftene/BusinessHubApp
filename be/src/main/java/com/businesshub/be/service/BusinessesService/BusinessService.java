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

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusinessService  {

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    UserRepository userRepository;

    public ServiceModel addService(ServiceModel serviceModel, long userId) throws MissingSubscriptionException {
        UserAccountModel userAccountModel = userRepository.findById(userId).get();
        UserDetailsModel userDetailsModel = userAccountModel.getUserDetails();

        if(userDetailsModel.getSubscriptionModel() == null){
            throw new MissingSubscriptionException("You must apply for a subscription");
        } else  {
        serviceModel.setUserAccount(userAccountModel);
        List<WorkingHoursModel> workingHoursModels = serviceModel.getWorkingHoursList();
        workingHoursModels.forEach(workingHour -> workingHour.setServiceModel(serviceModel));
        serviceRepository.save(serviceModel);
        return serviceModel;
        }

    }

    public List<ServiceModel> getAllServicesByUserId(long userId) {
        List<ServiceModel> allServices = serviceRepository.findAll();
        return allServices.stream().filter(service -> service.getUserAccount().getId() == userId).collect(Collectors.toList());
    }



}
