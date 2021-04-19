package com.businesshub.be.service.AccountDetailsService;

import com.businesshub.be.models.SubscriptionModel;
import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.models.UserDetailsModel;
import com.businesshub.be.repository.AccountDetailsRepository;
import com.businesshub.be.repository.SubscriptionRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountDetailsService {

    @Autowired
    AccountDetailsRepository accountDetailsRepository;

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    UserRepository userRepository;

    public UserDetailsModel addDetails(UserDetailsModel userDetailsModel, long userId, Integer serviceId) {
        UserAccountModel userAccountModel = userRepository.findById(userId).get();
        SubscriptionModel subscriptionModel = subscriptionRepository.findById(serviceId).get();

        subscriptionModel.getUserDetailsModelList().add(userDetailsModel);
        userDetailsModel.setUserAccount(userAccountModel);
        userDetailsModel.setSubscriptionModel(subscriptionModel);

        accountDetailsRepository.save(userDetailsModel);
        return userDetailsModel;
    }

    public UserDetailsModel getDetailsByUserId(long userId) {
        return accountDetailsRepository
                .findByUserAccountId(userId)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

}
