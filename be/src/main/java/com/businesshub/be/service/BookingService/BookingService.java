package com.businesshub.be.service.BookingService;

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

import java.util.Optional;

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
        if(bookingRequestBody.getUsername() == "") {
            bookingRepository.save(reservationModel);
            return new MessageResponse("Successfully added");
        } else {
            Optional<UserAccountModel> userAccountModel =
                    userRepository.findByUsername(bookingRequestBody.getUsername());
            if(userAccountModel.isPresent()) {
                reservationModel.setUserId(userAccountModel.get());
                bookingRepository.save(reservationModel);
                return new MessageResponse("Added!");
            } else {
                return new MessageResponse("User not found!");
            }

        }
    }
}
