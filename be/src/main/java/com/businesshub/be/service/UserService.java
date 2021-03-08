package com.businesshub.be.service;

import com.businesshub.be.models.UserModel;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public void createUser(UserModel userModel) {
        userRepository.save(userModel);
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        return new User("foo","foo",new ArrayList<>());
    }
}
