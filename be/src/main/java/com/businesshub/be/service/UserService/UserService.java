package com.businesshub.be.service.UserService;

import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public ResponseEntity closeAccount(Long userId) {
        Optional<UserAccountModel> userAccountModel = userRepository.findById(userId);
        userAccountModel
                .ifPresent(user -> userRepository.delete(user));

        return ResponseEntity.ok("Deleted");
    }

}
