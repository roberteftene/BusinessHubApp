package com.businesshub.be.service;

import com.businesshub.be.models.UserModel;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public void createUser(UserModel userModel) {
        userRepository.save(userModel);
    }
}
