package com.businesshub.be.repository;

import com.businesshub.be.models.UserDetailsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountDetailsRepository extends JpaRepository<UserDetailsModel,Integer> {


    Optional<UserDetailsModel> findByUserAccountId(long useraccount_id);

}
