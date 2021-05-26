package com.businesshub.be.payload.request;

import com.businesshub.be.models.ReservationModel;
import lombok.Data;

@Data
public class BookingRequestBody {
    String username;
    ReservationModel reservationModel;


    public BookingRequestBody(String username , ReservationModel reservationModel) {
        this.username = username;
        this.reservationModel = reservationModel;
    }
}
