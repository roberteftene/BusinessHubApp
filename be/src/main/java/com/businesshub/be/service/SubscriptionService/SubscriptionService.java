package com.businesshub.be.service.SubscriptionService;

import com.businesshub.be.models.SubscriptionModel;
import com.businesshub.be.repository.AccountDetailsRepository;
import com.businesshub.be.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubscriptionService {

    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    AccountDetailsRepository accountDetailsRepository;

    public List<SubscriptionModel> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }
}
