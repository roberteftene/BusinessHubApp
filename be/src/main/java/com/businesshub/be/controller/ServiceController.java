package com.businesshub.be.controller;

import com.businesshub.be.models.ServiceModel;
import com.businesshub.be.service.BusinessesService.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.ServiceMode;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    BusinessService businessService;

    @PostMapping("/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('BUSINESSOWNER') or hasRole('ADMIN')")
    public ServiceModel addService(@RequestBody ServiceModel serviceModel, @PathVariable(value = "id") long id) {
        return businessService.addService(serviceModel,id);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('BUSINESSOWNER') or hasRole('ADMIN')")
    public List<ServiceModel> getServicesByUserId(@PathVariable(value = "id") long id) {
        return  businessService.getAllServicesByUserId(id);
    }
}
