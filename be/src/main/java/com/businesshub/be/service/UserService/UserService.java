package com.businesshub.be.service.UserService;

import com.businesshub.be.models.*;
import com.businesshub.be.payload.response.MessageResponse;
import com.businesshub.be.repository.RoleRepository;
import com.businesshub.be.repository.ServiceRepository;
import com.businesshub.be.repository.UserEmployeeRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserEmployeeRepository userEmployeeRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    RoleRepository roleRepository;

    public ResponseEntity closeAccount(Long userId) {
        Optional<UserAccountModel> userAccountModel = userRepository.findById(userId);
        userAccountModel
                .ifPresent(user -> userRepository.delete(user));

        return ResponseEntity.ok("Deleted");
    }

    public String getDecryptedPasswordByUserId(Long id) {
        UserAccountModel userAccountModel = userRepository.findById(id).get();
        String password = userAccountModel.getPassword();
        return password;
    }

    public MessageResponse addEmployeeAccount(String username, int serviceId) {

        Optional<UserAccountModel> userAccountModel
                = userRepository.findByUsername(username);
        Role employeeRole = roleRepository.findByName(ERole.ROLE_EMPLOYEE)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        if (userAccountModel.get().getRoles().contains(employeeRole)) {
            return new MessageResponse("Already added!");
        }
        userAccountModel.get().getRoles().add(employeeRole);

        EmployeeModel employeeModel = new EmployeeModel();
        employeeModel.setServiceModel(serviceRepository.findById(serviceId).get());
        employeeModel.setUserAccountModel(userAccountModel.get());

        userEmployeeRepository.save(employeeModel);
        return new MessageResponse("Employee added!");
    }

    public MessageResponse removeEmployee(String username) {
        Optional<UserAccountModel> userAccountModel
                = userRepository.findByUsername(username);
        for(Role role : userAccountModel.get().getRoles()) {
            if(role.getName().equals(ERole.ROLE_EMPLOYEE)) {
                userAccountModel.get().getRoles().remove(role);
            }
        }
        EmployeeModel employeeModel = userEmployeeRepository.findAll()
                .stream()
                .filter(employee -> employee.getUserAccountModel().getUsername().equals(username))
                .collect(Collectors.toList())
                .get(0);

        userEmployeeRepository.delete(employeeModel);
        return new MessageResponse("Employee removed!");
    }

    public List<UserAccountModel> getAllEmployeesByOwnerId(Long ownerId) {
        List<ServiceModel> serviceModels = serviceRepository.findAll().stream()
                .filter(serviceModel -> serviceModel.getUserAccount().getId().equals(ownerId))
                .collect(Collectors.toList());

        List<EmployeeModel> employeeModelList = userEmployeeRepository.findAll();
        List<UserAccountModel> employeeModelsByService = new ArrayList<>();
        for (ServiceModel serviceModel : serviceModels) {
            for(EmployeeModel employeeModel : employeeModelList) {
                if(serviceModel.getServiceId() == employeeModel.getServiceModel().getServiceId()) {
                    UserAccountModel userAccountModel = userRepository.findById(employeeModel.getUserAccountModel().getId()).get();
                    employeeModelsByService.add(userAccountModel);
                }
            }
        }

        return  employeeModelsByService;
    }

}
