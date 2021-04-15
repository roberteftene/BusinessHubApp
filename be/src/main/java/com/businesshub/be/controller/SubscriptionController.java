package com.businesshub.be.controller;

import com.businesshub.be.models.SubscriptionModel;
import com.businesshub.be.service.SubscriptionService.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {

    @Autowired
    SubscriptionService subscriptionService;

    @PostMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('BUSINESSOWNER')")
    @ResponseBody
    public SubscriptionModel addSubscription(@RequestBody SubscriptionModel subscriptionModel, @PathVariable(value = "id") Long id) {
        return subscriptionService.addSubscription(subscriptionModel,id);
    }
}
