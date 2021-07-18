package com.businesshub.be.repository;

import com.businesshub.be.models.MenuPricesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuPricesRepository extends JpaRepository<MenuPricesModel,String> {
}
