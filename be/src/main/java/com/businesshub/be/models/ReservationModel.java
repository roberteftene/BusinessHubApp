package com.businesshub.be.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import sun.security.krb5.internal.crypto.EType;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date dateFormat = sdf.parse(this.reservationDate);
        Calendar cal = Calendar.getInstance();
        cal.setTime(dateFormat);
        return cal;
    }

    public static Calendar getCalendarDate(String inputDate) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = sdf.parse(inputDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar;
    }

    public static Calendar getCalendarCurrentDay(EDaysOfWeek day) {
        Calendar calendar = Calendar.getInstance();

        switch (day) {
            case Monday:
                calendar.set(Calendar.DAY_OF_WEEK, 2);
                break;
            case Tuesday:
                calendar.set(Calendar.DAY_OF_WEEK, 3);
                break;
            case Wednesday:
                calendar.set(Calendar.DAY_OF_WEEK, 4);
                break;
            case Thursday:
                calendar.set(Calendar.DAY_OF_WEEK, 5);
                break;
            case Friday:
                calendar.set(Calendar.DAY_OF_WEEK, 6);
                break;
            case Saturday:
                calendar.set(Calendar.DAY_OF_WEEK, 7);
                break;
            case Sunday:
                calendar.set(Calendar.DAY_OF_WEEK, 1);
                break;
        }

        return calendar;
    }

    public static List<ReservationModel> getBookingsByDay(EDaysOfWeek day, List<ReservationModel> reservationModels) throws ParseException {
        Calendar calendar = ReservationModel.getCalendarCurrentDay(day);
        List<ReservationModel> bookingsByDay = new ArrayList<>();
        for (ReservationModel reservationModel : reservationModels) {
            if (reservationModel.convertReviewDate().get(Calendar.DAY_OF_WEEK) == calendar.get(Calendar.DAY_OF_WEEK)) {
                bookingsByDay.add(reservationModel);
            }
        }
        return bookingsByDay;
    }

    public boolean checkIfTimeInInterval(ETimeInterval timeInterval) throws ParseException {
        Calendar calStartTime = Calendar.getInstance();
        Calendar calEndTime = Calendar.getInstance();
        boolean checker = false;
        boolean midNight = false;
        switch (timeInterval) {
            case nineTo12:
                calStartTime.set(Calendar.HOUR_OF_DAY, 9);
                calEndTime.set(Calendar.HOUR_OF_DAY, 12);
                break;
            case twelveTo3:
                calStartTime.set(Calendar.HOUR_OF_DAY, 12);
                calEndTime.set(Calendar.HOUR_OF_DAY, 15);
                break;
            case threeTo6:
                calStartTime.set(Calendar.HOUR_OF_DAY, 15);
                calEndTime.set(Calendar.HOUR_OF_DAY, 18);
                break;
            case sixTo9:
                calStartTime.set(Calendar.HOUR_OF_DAY, 18);
                calEndTime.set(Calendar.HOUR_OF_DAY, 21);
                break;
            case past9:
                calStartTime.set(Calendar.HOUR_OF_DAY, 21);
                midNight = true;
                break;

        }

            if (!midNight) {
                if (this.convertReviewDate().get(Calendar.HOUR_OF_DAY) >= calStartTime.get(Calendar.HOUR_OF_DAY) &&
                        this.convertReviewDate().get(Calendar.HOUR_OF_DAY) < calEndTime.get(Calendar.HOUR_OF_DAY)) {
                    checker = true;
                }
            } else {
                if (this.convertReviewDate().get(Calendar.HOUR_OF_DAY) >= calStartTime.get(Calendar.HOUR_OF_DAY)) {
                    checker = true;
                }
            }

        return checker;
    }

}
