import Card from "react-bootstrap/Card";
import "./BookingCard.css";

function BookingCard(props) {
  return (
    <div className="booking-card-container">
      <Card className="booking-card" style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title>
            {props.booking.clientName.length === 0 && (
              <>
                <span>User account</span>
              </>
            )}
            {props.booking.clientName.length !== 0 && (
              <>
                <span> Client: {props.booking.clientName}</span>
              </>
            )}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {props.booking.reservationDate}
          </Card.Subtitle>
          <Card.Text>
            <span className="booking-card-noPersons">
              Persons: <b>{props.booking.noPersons}</b>
            </span>
            <br></br>
            <br></br>
            <span className="booking-card-extraDetails">
              {props.booking.details}
            </span>
          </Card.Text>
          <Card.Link href="#">Modify</Card.Link>
          <Card.Link href="#">Remove</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookingCard;
