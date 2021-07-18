package com.businesshub.be.service.BusinessesService;

import com.businesshub.be.exceptions.MissingSubscriptionException;
import com.businesshub.be.models.*;
import com.businesshub.be.repository.BookingRepository;
import com.businesshub.be.repository.ServiceRepository;
import com.businesshub.be.repository.UserEmployeeRepository;
import com.businesshub.be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.ws.ServiceMode;
import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BusinessService {

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserEmployeeRepository employeeRepository;

    @Autowired
    BookingRepository bookingRepository;

    public ServiceModel addService(ServiceModel serviceModel, long userId) throws MissingSubscriptionException {
        UserAccountModel userAccountModel = userRepository.findById(userId).get();
        UserDetailsModel userDetailsModel = userAccountModel.getUserDetails();

        if (userDetailsModel.getSubscriptionModel() == null) {
            throw new MissingSubscriptionException("You must apply for a subscription");
        } else {
            serviceModel.setUserAccount(userAccountModel);
            List<WorkingHoursModel> workingHoursModels = serviceModel.getWorkingHoursList();
            if (workingHoursModels.equals(null)) {
                throw new NullPointerException("There is no working hour schedule");
            } else {
                workingHoursModels.forEach(workingHour -> workingHour.setServiceModel(serviceModel));
                serviceRepository.save(serviceModel);
                return serviceModel;
            }

        }

    }

    public void updateService(ServiceModel updatedService, int serviceId) {
        ServiceModel serviceModel = serviceRepository.findById(serviceId).get();
        serviceModel.setAddress(updatedService.getAddress());
        serviceModel.setCategory(updatedService.getCategory());
        serviceModel.setCity(updatedService.getCity());
        serviceModel.setServiceDescription(updatedService.getServiceDescription());
        serviceModel.setServiceEmail(updatedService.getServiceEmail());
        serviceModel.setServiceName(updatedService.getServiceName());
        serviceModel.setServicePhone(updatedService.getServicePhone());
        serviceModel.setWorkingHoursList(updatedService.getWorkingHoursList());
        serviceRepository.save(serviceModel);
    }

    public List<ServiceModel> getAllServicesByUserId(long userId) {
        List<ServiceModel> allServices = serviceRepository.findAll();
        return allServices.stream().filter(service -> service.getUserAccount().getId() == userId).collect(Collectors.toList());
    }

    public List<ServiceModel> getAllServices() {
        return serviceRepository.findAll();
    }

    public List<ServiceModel> computeCommunityTop(double noReviewsImportanceIndex, double ratingImportanceIndex) {
        List<ServiceModel> services = new ArrayList<>();
        services.addAll(serviceRepository.findAll());

        for (ServiceModel service : services) {
            if (service.getReviewModelList().size() > 0) {
                double popularityIndex =
                        noReviewsImportanceIndex * Math.log10(service.getReviewModelList().size())
                                + ratingImportanceIndex * service.getRating();
                service.setPopularityIndex(popularityIndex);
            } else {
                service.setPopularityIndex(0);
            }

        }

        List<ServiceModel> communityTop = services.stream()
                .filter(service -> service.getPopularityIndex() > 0)
                .sorted(Comparator.comparingDouble(ServiceModel::getPopularityIndex).reversed())
                .collect(Collectors.toList());

        if (communityTop.size() > 3) {
            return communityTop.subList(0, 3);
        } else {
            return communityTop;
        }
    }

    public ServiceModel getServiceById(Integer id) {
        ServiceModel serviceModel = serviceRepository.findById(id).get();
        return serviceModel;
    }

    public Map<EDaysOfWeek,Map<ETimeInterval,Integer>> getBookingsDataForBarchartGraphic(int serviceId, String startDate, String endDate) throws ParseException {

        List<ReservationModel> reservationModels = serviceRepository.findById(serviceId).get().getReservationModelsList();
        List<ReservationModel> reservationsByPeriod = new ArrayList<>();

        for (ReservationModel reservationModel : reservationModels) {
            if (reservationModel.convertReviewDate().after(ReservationModel.getCalendarDate(startDate)) &&
                    reservationModel.convertReviewDate().before(ReservationModel.getCalendarDate(endDate))) {
                reservationsByPeriod.add(reservationModel);
            }
        }
        Map<EDaysOfWeek, Map<ETimeInterval,Integer>> bookingPopularTimes = new HashMap<>();
        bookingPopularTimes.put(EDaysOfWeek.Monday,getDictionaryWIthIntervalsCountersByDay(EDaysOfWeek.Monday, reservationsByPeriod));
        bookingPopularTimes.put(EDaysOfWeek.Tuesday,getDictionaryWIthIntervalsCountersByDay(EDaysOfWeek.Tuesday, reservationsByPeriod));
        bookingPopularTimes.put(EDaysOfWeek.Wednesday,getDictionaryWIthIntervalsCountersByDay(EDaysOfWeek.Wednesday, reservationsByPeriod));
        bookingPopularTimes.put(EDaysOfWeek.Thursday,getDictionaryWIthIntervalsCountersByDay(EDaysOfWeek.Thursday, reservationsByPeriod));
        bookingPopularTimes.put(EDaysOfWeek.Friday,getDictionaryWIthIntervalsCountersByDay(EDaysOfWeek.Friday, reservationsByPeriod));
        bookingPopularTimes.put(EDaysOfWeek.Saturday,getDictionaryWIthIntervalsCountersByDay(EDaysOfWeek.Saturday, reservationsByPeriod));
        bookingPopularTimes.put(EDaysOfWeek.Sunday,getDictionaryWIthIntervalsCountersByDay(EDaysOfWeek.Sunday, reservationsByPeriod));

        return bookingPopularTimes;

    }

    public Map<ETimeInterval, Integer> getDictionaryWIthIntervalsCountersByDay(EDaysOfWeek dayOfWeek, List<ReservationModel> reservationsByPeriod) throws ParseException {
        List<ReservationModel> bookingsByDayOfWeek = ReservationModel.getBookingsByDay(dayOfWeek, reservationsByPeriod);

        int booking9To12Counter = 0,
                booking12To3Counter = 0,
                booking3To6Counter = 0,
                booking6To9Counter = 0,
                bookingPast9Counter = 0;

        for (ReservationModel booking : bookingsByDayOfWeek) {
            if(booking.checkIfTimeInInterval(ETimeInterval.nineTo12)) {
                booking9To12Counter++;
            }
            if(booking.checkIfTimeInInterval(ETimeInterval.twelveTo3)) {
                booking12To3Counter++;
            }
            if(booking.checkIfTimeInInterval(ETimeInterval.threeTo6)) {
                booking3To6Counter++;
            }
            if(booking.checkIfTimeInInterval(ETimeInterval.sixTo9)) {
                booking6To9Counter++;
            }
            if(booking.checkIfTimeInInterval(ETimeInterval.past9)) {
                bookingPast9Counter++;
            }
        }

        Map<ETimeInterval,Integer> intervalsCounter = new HashMap<>();
        intervalsCounter.put(ETimeInterval.nineTo12,booking9To12Counter);
        intervalsCounter.put(ETimeInterval.twelveTo3,booking12To3Counter);
        intervalsCounter.put(ETimeInterval.threeTo6,booking3To6Counter);
        intervalsCounter.put(ETimeInterval.sixTo9,booking6To9Counter);
        intervalsCounter.put(ETimeInterval.past9,bookingPast9Counter);


        return intervalsCounter;
    }


    public Map<String, Integer> getReviewsDataForBarchartGraphic(int serviceId, EPeriod period) {
        List<ReviewModel> reviews = serviceRepository.findById(serviceId).get().getReviewModelList();
        List<ReviewModel> reviewForDesiredPeriod = new ArrayList<>();

        reviews.forEach(reviewModel -> {
            if (reviewModel.checkIfSamePeriod(period)) {
                reviewForDesiredPeriod.add(reviewModel);
            }
        });

        Map<String, Integer> reviewsByStars = new HashMap<>();
        int oneStarCounter = 0,
                twoStarCounter = 0,
                threeStarsCounter = 0,
                fourStarsCounter = 0,
                fiveStarsCounter = 0;

        for (ReviewModel reviewModel : reviewForDesiredPeriod) {
            switch (reviewModel.getReviewRating()) {
                case 5:
                    fiveStarsCounter++;
                    break;
                case 4:
                    fourStarsCounter++;
                    break;
                case 3:
                    threeStarsCounter++;
                    break;
                case 2:
                    twoStarCounter++;
                    break;
                case 1:
                    oneStarCounter++;
                    break;
            }

        }

        reviewsByStars.put(EGraphicRatingAxis.FIVE_STAR.toString(), fiveStarsCounter);
        reviewsByStars.put(EGraphicRatingAxis.FOUR_STAR.toString(), fourStarsCounter);
        reviewsByStars.put(EGraphicRatingAxis.THREE_STAR.toString(), threeStarsCounter);
        reviewsByStars.put(EGraphicRatingAxis.TWO_STAR.toString(), twoStarCounter);
        reviewsByStars.put(EGraphicRatingAxis.ONE_STAR.toString(), oneStarCounter);

        return reviewsByStars;

    }

    public int getServiceIdByEmployeeId(long employeeId) {
        return employeeRepository.findAll().stream()
                .filter(employeeModel -> employeeModel.getUserAccountModel().getId().equals(employeeId))
                .collect(Collectors.toList())
                .get(0)
                .getServiceModel()
                .getServiceId();
    }


}
