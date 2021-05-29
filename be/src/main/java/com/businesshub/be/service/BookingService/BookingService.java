package com.businesshub.be.service.BookingService;

import com.businesshub.be.models.EPeriod;
import com.businesshub.be.models.ReservationModel;
import com.businesshub.be.models.ServiceModel;
import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.payload.request.BookingRequestBody;
import com.businesshub.be.payload.response.MessageResponse;
import com.businesshub.be.repository.BookingRepository;
import com.businesshub.be.repository.ServiceRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    UserRepository userRepository;

    public MessageResponse saveBooking(int serviceId, BookingRequestBody bookingRequestBody) {
        ServiceModel serviceModel = serviceRepository.findById(serviceId).get();
        ReservationModel reservationModel = bookingRequestBody.getReservationModel();
        reservationModel.setServiceId(serviceModel);
        if (bookingRequestBody.getUsername() == "") {
            bookingRepository.save(reservationModel);
            return new MessageResponse("Successfully added");
        } else {
            Optional<UserAccountModel> userAccountModel =
                    userRepository.findByUsername(bookingRequestBody.getUsername());
            if (userAccountModel.isPresent()) {
                reservationModel.setUserId(userAccountModel.get());
                bookingRepository.save(reservationModel);
                return new MessageResponse("Added!");
            } else {
                return new MessageResponse("User not found!");
            }

        }
    }

    public Map<EPeriod, List<ReservationModel>> getAllBookings() throws ParseException {
        Map<EPeriod, List<ReservationModel>> allBookingsMap = new HashMap<>();
        List<ReservationModel> reservationModelsToday = new ArrayList<>();
        List<ReservationModel> reservationModelsThisWeek = new ArrayList<>();
        List<ReservationModel> reservationModelsFutureMonth = new ArrayList<>();
        List<ReservationModel> reservationModels = bookingRepository.findAll();
        Date date = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        for (ReservationModel reservation : reservationModels) {
            if (reservation.convertReviewDate().get(Calendar.DAY_OF_YEAR) == cal.get(Calendar.DAY_OF_YEAR) &&
                    reservation.convertReviewDate().get(Calendar.YEAR) == cal.get(Calendar.YEAR)) {
                reservationModelsToday.add(reservation);
            } else if (reservation.convertReviewDate().get(Calendar.WEEK_OF_MONTH) == cal.get(Calendar.WEEK_OF_MONTH) &&
                    reservation.convertReviewDate().get(Calendar.YEAR) == cal.get(Calendar.YEAR)) {
                reservationModelsThisWeek.add(reservation);
            } else if (reservation.convertReviewDate().get(Calendar.MONTH) == cal.get(Calendar.MONTH) &&
                    reservation.convertReviewDate().get(Calendar.YEAR) == cal.get(Calendar.YEAR) &&
                    reservation.convertReviewDate().after(cal)) {
                reservationModelsFutureMonth.add(reservation);
            }
        }

        allBookingsMap.put(EPeriod.TODAY,reservationModelsToday);
        allBookingsMap.put(EPeriod.THIS_WEEK,reservationModelsThisWeek);
        allBookingsMap.put(EPeriod.THIS_MONTH,reservationModelsFutureMonth);
        allBookingsMap.put(EPeriod.FOREVER,reservationModels);
        return allBookingsMap;
    }
}
