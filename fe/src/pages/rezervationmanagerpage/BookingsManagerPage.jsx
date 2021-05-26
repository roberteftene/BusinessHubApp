import { Component } from "react";
import { Button } from "react-bootstrap";
import "./BookingsManagerPage.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import cogoToast from "cogo-toast";
import BookingService from "../../services/booking/booking.service";
import AuthService from "../../services/auth/auth.service";
import BusinessService from "../../services/business/business.service";

export default class BookingsManagerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      hasAccount: "",
      userName: "",
      clientName: "",
      noPersons: 0,
      extraDetails: "",
      bookingDate: "",
      bookingTime: "",
      businessId: 0,
    };
    this.currLoggedUser = AuthService.getLoggedUser();
  }

  componentDidMount() {
    BusinessService.getServiceIdByEmployeeId(
      this.currLoggedUser.id,
      this.currLoggedUser.token
    ).then((res) => {
      const id = res.data;
      this.setState({ businessId: id });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let valid = true;
    const reqBody = {
      username: this.state.userName,
      reservationModel: {
        reservationDate: this.state.bookingDate + " " + this.state.bookingTime,
        noPersons: this.state.noPersons,
        details: this.state.extraDetails,
        clientName: this.state.clientName,
      },
    };

    if (valid) {
      BookingService.addBooking(
        this.state.businessId,
        this.currLoggedUser.token,
        reqBody
      )
        .then((res) => {
          console.log(res);
          if (res.data !== null) {
            cogoToast.success("Added!");
            this.setState({ show: false });
          }
        })
        .catch((err) => {
          cogoToast.error(err.message);
        });
    }
  }

  render() {
    return (
      <div className="rezervation-manager-page-container">
        <Button
          className="add-booking-btn"
          onClick={() => this.setState({ show: true })}
        >
          Add booking
        </Button>
        <div className="rezervation-manager-page">
          <h1>Today</h1>
          <h1>This week</h1>
          <h1>Future bookings</h1>
        </div>

        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Complete booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCheckbox">
                <Form.Text className="text-muted">
                  Does the client have an account?
                </Form.Text>
                <Form.Check
                  type="switch"
                  label="Yes"
                  onChange={(e) =>
                    this.setState({ hasAccount: e.target.checked })
                  }
                ></Form.Check>
              </Form.Group>

              {this.state.hasAccount === true && (
                <>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Text className="text-muted">
                      Fill the username of the client if he has an account.
                    </Form.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter client username"
                      value={this.state.userName}
                      onChange={(e) =>
                        this.setState({ userName: e.target.value })
                      }
                    />
                  </Form.Group>
                </>
              )}

              {this.state.hasAccount === false && (
                <>
                  <Form.Group controlId="formClientName">
                    <Form.Label>Client name</Form.Label>
                    <Form.Text className="text-muted">
                      Fill the client name only if he doesn't have an account.
                    </Form.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter client name"
                      value={this.state.clientName}
                      onChange={(e) =>
                        this.setState({ clientName: e.target.value })
                      }
                    />
                  </Form.Group>
                </>
              )}

              <Form.Group controlId="formNoPersons">
                <Form.Label>Number of persons</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter number of persons"
                  value={this.state.noPersons}
                  onChange={(e) => this.setState({ noPersons: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formDetails">
                <Form.Label>Extra details</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter extra details if needed"
                  value={this.state.extraDetails}
                  onChange={(e) =>
                    this.setState({ extraDetails: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formBookingDate">
                <Form.Label>Booking date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter date"
                  value={this.state.bookingDate}
                  onChange={(e) =>
                    this.setState({ bookingDate: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formBookingHour">
                <Form.Label>Enter booking time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Enter time"
                  value={this.state.bookingTime}
                  onChange={(e) =>
                    this.setState({ bookingTime: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ show: false })}
            >
              Close
            </Button>
            <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
