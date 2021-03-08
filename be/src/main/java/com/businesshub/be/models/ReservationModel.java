package com.businesshub.be.models;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "reservation")
@Data
public class ReservationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "reserv_id")
    private Integer reservId;
    @Column(name = "date")
    private String reservationDate;
    @Column(name = "time")
    private String reservationTime;
    @Column(name = "status")
    private String reservationStatus;
    @Column(name = "no_persons")
    private int noPersons;

    private Integer serviceId;
    private Integer userId;

    public ReservationModel(String reservationDate, String reservationTime, String reservationStatus, int noPersons, Integer serviceId, Integer userId) {
        this.reservationDate = reservationDate;
        this.reservationTime = reservationTime;
        this.reservationStatus = reservationStatus;
        this.noPersons = noPersons;
        this.serviceId = serviceId;
        this.userId = userId;
    }

    public ReservationModel() {
    }
}
