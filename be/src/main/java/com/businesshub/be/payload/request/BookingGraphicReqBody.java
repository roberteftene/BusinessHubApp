package com.businesshub.be.payload.request;

import lombok.Data;

@Data
public class BookingGraphicReqBody {
    String startDate;
    String endDate;


    public BookingGraphicReqBody(String startDate, String endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
