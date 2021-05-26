package com.businesshub.be.service.BookingService;

import com.businesshub.be.models.ReservationModel;
import com.businesshub.be.models.ServiceModel;
import com.businesshub.be.models.UserAccountModel;
import com.businesshub.be.payload.request.BookingRequestBody;
import com.businesshub.be.repository.BookingRepository;
import com.businesshub.be.repository.ServiceRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    UserRepository userRepository;
    public ReservationModel saveBooking(int serviceId, BookingRequestBody bookingRequestBody) {
        ServiceModel serviceModel = serviceRepository.findById(serviceId).get();
        ReservationModel reservationModel = bookingRequestBody.getReservationModel();
        reservationModel.setServiceId(serviceModel);
        if(bookingRequestBody.getUsername() == "") {
            bookingRepository.save(reservationModel);
            return reservationModel;
        } else {
            UserAccountModel userAccountModel =
                    userRepository.findByUsername(bookingRequestBody.getUsername()).get();
            reservationModel.setUserId(userAccountModel);
            bookingRepository.save(reservationModel);
            return reservationModel;
        }
    }
}
