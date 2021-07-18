import { useState } from "react";
import "./ReservationsCard.css";
import AuthService from "../../services/auth/auth.service";
import bookingService from "../../services/booking/booking.service";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../../pages/profilepage/ProfilePage.css";
import { Button } from "react-bootstrap";

function ReservationsCard(props) {
  const currLoggedUser = AuthService.getLoggedUser();
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    bookingService
      .getBookingsByUserId(currLoggedUser.id, currLoggedUser.token)
      .then((res) => {
        const data = res.data;
        setUserReservations(data);
      });
  });

  return (
    <div className="booking_card_container">
      <Card className="benefits-card user-details-card-container">
        <Card.Title className="user-details-card-title">
          Your bookings
        </Card.Title>

        <Card.Body
          className="benefits-card-container-body"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {userReservations.map((booking) => {
            return (
              <Card className="booking-card" style={{ width: "60%" }}>
                <Card.Title className="user-details-card-title">
                  Schedule {booking.reservationDate}
                </Card.Title>
                <Card.Body>
                  <div className="">
                    <span>Details: {booking.details}</span>
                  </div>
                  <div className="">
                    <span>Number of persons: {booking.noPersons}</span>
                  </div>
                  <div className="">
                    <Button>Cancel booking</Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ReservationsCard;
