package com.businesshub.be.controller;

import com.businesshub.be.models.UserModel;
import com.businesshub.be.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/pg")
public class UserController {

    @Resource
    UserService userService;

    @GetMapping(value = "/users")
    public List<UserModel> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping(value = "/createuser")
    public void createUser(@RequestBody UserModel userModel) {
        userService.createUser(userModel);
    }
}
