package com.businesshub.be.repository;

import com.businesshub.be.models.ReservationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<ReservationModel,Integer> {
}
