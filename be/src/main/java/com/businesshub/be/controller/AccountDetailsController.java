package com.businesshub.be.controller;

import com.businesshub.be.models.UserDetailsModel;
import com.businesshub.be.payload.response.MessageResponse;
import com.businesshub.be.service.AccountDetailsService.AccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/account-details")
public class AccountDetailsController {

    @Autowired
    AccountDetailsService accountDetailsService;

    @PostMapping("/{id}")
    @ResponseBody
    public UserDetailsModel addDetails(@RequestBody UserDetailsModel userDetailsModel, @PathVariable(value = "id") long userId) {
        accountDetailsService.addDetails(userDetailsModel,userId);
        return  userDetailsModel;
    }

    @GetMapping("/{id}")
    public UserDetailsModel getDetailsByUserId(@PathVariable(value = "id")long userId) {
        return accountDetailsService.getDetailsByUserId(userId);
    }

}
