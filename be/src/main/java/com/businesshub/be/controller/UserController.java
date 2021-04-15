package com.businesshub.be.controller;

import com.businesshub.be.models.ServiceModel;
import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.repository.ServiceRepository;
import com.businesshub.be.service.BusinessesService.BusinessService;
import com.businesshub.be.service.UserService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/account")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    BusinessService businessService;

    @Autowired
    ServiceRepository serviceRepository;

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('BUSINESSOWNER') or hasRole('ADMIN')")
    ResponseEntity closeAccountById(@PathVariable(value = "id") Long id) {
        List<ServiceModel> allServicesByUserId = businessService.getAllServicesByUserId(id);
        serviceRepository.deleteAll(allServicesByUserId);
        return userService.closeAccount(id);
    }
}
