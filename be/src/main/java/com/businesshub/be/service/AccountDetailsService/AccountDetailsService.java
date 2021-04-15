package com.businesshub.be.service.AccountDetailsService;

import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.models.UserDetailsModel;
import com.businesshub.be.payload.response.MessageResponse;
import com.businesshub.be.repository.AccountDetailsRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.stream.Collectors;

@Service
public class AccountDetailsService {

    @Autowired
    AccountDetailsRepository accountDetailsRepository;

    @Autowired
    UserRepository userRepository;

    public UserDetailsModel addDetails(UserDetailsModel userDetailsModel, long userId) {
        UserAccountModel userAccountModel = userRepository.findById(userId).get();
        userDetailsModel.setUserAccount(userAccountModel);
        accountDetailsRepository.save(userDetailsModel);
        return userDetailsModel;
    }

    public UserDetailsModel getDetailsByUserId(long userId) {
        return accountDetailsRepository
                .findByUserAccountId(userId)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

}
