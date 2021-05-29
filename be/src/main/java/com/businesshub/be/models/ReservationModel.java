package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Entity(name = "reservation")
@Data
public class ReservationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "reserv_id")
    private Integer reservId;
    @Column(name = "date")
    private String reservationDate;
    @Column(name = "no_persons")
    private int noPersons;
    @Column(name = "details")
    private String details;
    @Column(name = "client_name")
    private String clientName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", referencedColumnName = "service_id")
    @JsonIgnore
    private ServiceModel serviceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private UserAccountModel userId;

    public ReservationModel(String reservationDate, int noPersons, String details, String clientName) {
        this.reservationDate = reservationDate;
        this.noPersons = noPersons;
        this.details = details;
        this.clientName = clientName;
    }

    public ReservationModel(String reservationDate, int noPersons, String details) {
        this.reservationDate = reservationDate;
        this.noPersons = noPersons;
        this.details = details;
    }

    public ReservationModel() {
    }

    public Calendar convertReviewDate() throws ParseException {
        String[] dateAndTime = this.reservationDate.split(" ");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date dateFormat = sdf.parse(dateAndTime[0]);
        Calendar cal = Calendar.getInstance();
        cal.setTime(dateFormat);
        return cal;
    }
}
