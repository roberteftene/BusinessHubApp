package com.businesshub.be.controller;

import com.businesshub.be.models.UserDetailsModel;
import com.businesshub.be.service.AccountDetailsService.AccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/account-details")
public class AccountDetailsController {

    @Autowired
    AccountDetailsService accountDetailsService;

    @PostMapping
    @ResponseBody
    public UserDetailsModel addDetails(@RequestBody UserDetailsModel userDetailsModel) {
        accountDetailsService.addDetails(userDetailsModel);
        return  userDetailsModel;
    }
}
