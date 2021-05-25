package com.businesshub.be.service.UserService;

import com.businesshub.be.models.ERole;
import com.businesshub.be.models.EmployeeModel;
import com.businesshub.be.models.Role;
import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.payload.response.MessageResponse;
import com.businesshub.be.repository.RoleRepository;
import com.businesshub.be.repository.ServiceRepository;
import com.businesshub.be.repository.UserEmployeeRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

}
