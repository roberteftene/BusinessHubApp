package com.businesshub.be.repository;

import com.businesshub.be.models.EmployeeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserEmployeeRepository extends JpaRepository<EmployeeModel, Long> {



}
