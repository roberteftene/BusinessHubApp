package com.businesshub.be.repository;

import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.models.UserDetailsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserAccountModel,Long> {

    Optional<UserAccountModel> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}
