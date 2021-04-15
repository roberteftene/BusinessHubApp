package com.businesshub.be.service.SubscriptionService;

import com.businesshub.be.models.SubscriptionModel;
import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.repository.SubscriptionRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubscriptionService {

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    UserRepository userRepository;

    public SubscriptionModel addSubscription(SubscriptionModel subscriptionModel, Long id) {
        UserAccountModel userAccountModel = userRepository.findById(id).get();
        subscriptionModel.setUserAccount(userAccountModel);
        return subscriptionRepository.save(subscriptionModel);
    }

}
