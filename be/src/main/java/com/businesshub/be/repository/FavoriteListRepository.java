package com.businesshub.be.repository;

import com.businesshub.be.models.BusinessFavoriteList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteListRepository extends JpaRepository<BusinessFavoriteList, Integer> {
}
