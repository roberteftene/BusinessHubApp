package com.businesshub.be.repository;

import com.businesshub.be.models.ReviewModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewModel,Integer> {
}
