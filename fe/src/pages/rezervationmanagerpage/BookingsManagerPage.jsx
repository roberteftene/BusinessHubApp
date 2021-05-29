import { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import "./BookingsManagerPage.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import cogoToast from "cogo-toast";
import BookingService from "../../services/booking/booking.service";
import AuthService from "../../services/auth/auth.service";
import BusinessService from "../../services/business/business.service";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import BookingCard from "../../components/booking-card/BookingCard";

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
      bookingsObj: {
        FOREVER: [],
        THIS_MONTH: [],
        THIS_WEEK: [],
        TODAY: [],
      },
    };
    this.currLoggedUser = AuthService.getLoggedUser();
  }

  componentDidMount() {
    BookingService.getAllBookings(this.currLoggedUser.token).then((res) => {
      const resData = res.data;
      this.setState({ bookingsObj: resData });
    });
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

  businessesArrayToGridArray(totalCols, period) {
    let obj = [];
    switch (period) {
      case "TODAY":
        obj = this.state.bookingsObj.TODAY;
        break;
      case "FOREVER":
        obj = this.state.bookingsObj.FOREVER;
        break;
      case "THIS_MONTH":
        obj = this.state.bookingsObj.THIS_MONTH;
        break;
      case "THIS_WEEK":
        obj = this.state.bookingsObj.THIS_WEEK;
        break;
    }
    let gridArray = [[]];
    let countColumns = 1;
    for (var i = 0; i < obj.length; i++) {
      gridArray[gridArray.length - 1].push(obj[i]);
      if (countColumns <= totalCols) {
        countColumns++;
      }
      if (countColumns > totalCols && i !== obj.length - 1) {
        countColumns = 1;
        gridArray.push([]);
      }
    }
    return gridArray;
  }

  render() {
    let gridToday = this.businessesArrayToGridArray(2, "TODAY");
    let gridForever = this.businessesArrayToGridArray(2, "FOREVER");
    let gridMonth = this.businessesArrayToGridArray(2, "THIS_MONTH");
    let gridWeek = this.businessesArrayToGridArray(2, "THIS_WEEK");
    return (
      <div className="rezervation-manager-page-container">
        <Button
          className="add-booking-btn"
          onClick={() => this.setState({ show: true })}
        >
          Add booking
        </Button>
        <div className="rezervation-manager-page">
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Today
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {gridToday.map((row) => {
                    return (
                      <Row>
                        {row.map((col) => {
                          return (
                            <Col className="booking-card-col">
                              <BookingCard
                                key={col.reservId}
                                booking={col}
                              ></BookingCard>
                            </Col>
                          );
                        })}
                      </Row>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="1">
                This week
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  {gridWeek.map((row) => {
                    return (
                      <Row>
                        {row.map((col) => {
                          return (
                            <Col className="booking-card-col">
                              <BookingCard
                                key={col.reservId}
                                booking={col}
                              ></BookingCard>
                            </Col>
                          );
                        })}
                      </Row>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                Next this month
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  {gridMonth.map((row) => {
                    return (
                      <Row>
                        {row.map((col) => {
                          return (
                            <Col className="booking-card-col">
                              <BookingCard
                                key={col.reservId}
                                booking={col}
                              ></BookingCard>
                            </Col>
                          );
                        })}
                      </Row>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                All
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  {gridForever.map((row) => {
                    return (
                      <Row>
                        {row.map((col) => {
                          return (
                            <Col className="booking-card-col">
                              <BookingCard
                                key={col.reservId}
                                booking={col}
                              ></BookingCard>
                            </Col>
                          );
                        })}
                      </Row>
                    );
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
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
