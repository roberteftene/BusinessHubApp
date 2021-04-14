package com.businesshub.be.service.AccountDetailsService;

import com.businesshub.be.models.UserDetailsModel;
import com.businesshub.be.repository.AccountDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountDetailsService {

    @Autowired
    AccountDetailsRepository accountDetailsRepository;


    public UserDetailsModel addDetails(UserDetailsModel userDetailsModel) {
        accountDetailsRepository.save(userDetailsModel);
        return userDetailsModel;
    }
}
