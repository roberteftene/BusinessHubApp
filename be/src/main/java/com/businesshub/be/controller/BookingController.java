package com.businesshub.be.controller;

import com.businesshub.be.models.EPeriod;
import com.businesshub.be.models.ReservationModel;
import com.businesshub.be.payload.request.BookingRequestBody;
import com.businesshub.be.payload.response.MessageResponse;
import com.businesshub.be.service.BookingService.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @PostMapping("/{serviceId}")
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('BUSINESSOWNER') or hasRole('ADMIN')")
    public MessageResponse saveReservation(@PathVariable(value = "serviceId") int serviceId, @RequestBody BookingRequestBody requestBody) {
        return bookingService.saveBooking(serviceId,requestBody);
    }

    @GetMapping
    @PreAuthorize("hasRole('EMPLOYEE') or hasRole('BUSINESSOWNER') or hasRole('ADMIN')")
    public Map<EPeriod, List<ReservationModel>> getAllBookings() throws ParseException {
        return bookingService.getAllBookings();
    }
}
