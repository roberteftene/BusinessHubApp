package com.businesshub.be.repository;

import com.businesshub.be.models.UserDetailsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountDetailsRepository extends JpaRepository<UserDetailsModel,Integer> {
}
