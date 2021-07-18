import "./BusinessProfileCard.css";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../user-details-card/UserDetailsCard.css";
import "./BusinessProfileCard.css";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import BusinessService from "../../services/business/business.service";
import AuthService from "../../services/auth/auth.service";

function BusinessProfileCard(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [serviceName, setServiceName] = useState(props.business.serviceName);
  const [serviceEmail, setServiceEmail] = useState(props.business.serviceEmail);
  const [servicePhone, setServicePhone] = useState(props.business.servicePhone);
  const [serviceCity, setServiceCity] = useState(props.business.city);
  const [serviceStreet, setServiceStreet] = useState(props.business.address);
  const [serviceDescription, setServiceDescription] = useState(
    props.business.serviceDescription
  );

  const handleSaveUpdates = () => {
    const currLoggedUser = AuthService.getLoggedUser();
    setShow(false);
    BusinessService.updateService(
      props.business.serviceId,
      {
        serviceName: serviceName,
        serviceEmail: serviceEmail,
        servicePhone: servicePhone,
        serviceDescription: serviceDescription,
        category: props.business.category,
        address: serviceStreet,
        city: serviceCity,
        rating: props.business.rating,
        workingHoursList: props.business.workingHoursList,
      },
      currLoggedUser.token
    ).then(() => {});
  };
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    setFile(file);
  };

  return (
    <div className="user-details-card-container">
      <Card
        key={props.business.serviceId}
        style={{ width: "100%" }}
        className="user-details-card"
      >
        <Card.Title className="user-details-card-title">
          Your service details
        </Card.Title>
        <Card.Body className="user-details-card-body">
          <Row>
            <Col>
              <Form.Group controlId="details-group-service-name">
                <Form.Label>Service name</Form.Label>
                <Form.Control readOnly value={props.business.serviceName} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="details-group-email">
                <Form.Label>Service Email</Form.Label>
                <Form.Control readOnly value={props.business.serviceEmail} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="details-group-phone">
                <Form.Label>Service Phone</Form.Label>
                <Form.Control readOnly value={props.business.servicePhone} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="details-group-category">
                <Form.Label>Service category</Form.Label>
                <Form.Control readOnly value={props.business.category} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="details-group-address">
                <Form.Label>Service address</Form.Label>
                <Form.Control readOnly value={props.business.address} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="details-group-city">
                <Form.Label>City</Form.Label>
                <Form.Control readOnly value={props.business.city} />
              </Form.Group>
            </Col>
          </Row>
          <Row md={3}>
            <Col>
              <Form.Group controlId="details-group-description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  readOnly
                  as="textarea"
                  value={props.business.serviceDescription}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="working-hours-title">Working hours</span>
              {props.business.workingHoursList.map((workingDay) => {
                return (
                  <Row
                    key={`row-${workingDay.dayOfWeek}`}
                    id="workingDay-row"
                    md={6}
                    className="workingHour-schedule-section"
                  >
                    <Col>
                      <span>{workingDay.dayOfWeek}</span>
                    </Col>
                    <Col>
                      <Form.Group controlId="startingHour">
                        <Form.Control
                          controlid={`check-starting-${workingDay.dayOfWeek}`}
                          type="number"
                          className="workingHour-schedule"
                          value={workingDay.startingHour}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="endingHour">
                        <Form.Control
                          readOnly
                          controlid={`check-starting-${workingDay.dayOfWeek}`}
                          type="number"
                          className="workingHour-schedule"
                          value={workingDay.closeHour}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </Card.Body>
        <Button
          className="edit-details-btn"
          variant="outline-primary"
          onClick={handleShow}
        >
          Edit details
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formServiceName">
              <Form.Label>Service name</Form.Label>
              <Form.Text className="text-muted">
                The name of your service is very important towards promoting it.
              </Form.Text>
              <Form.Control
                type="text"
                placeholder="Enter service name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formServiceEmail">
              <Form.Label>Service email</Form.Label>
              <Form.Text className="text-muted">
                Having a business email can create new threads for
                communications.
              </Form.Text>
              <Form.Control
                type="text"
                placeholder="Enter service email"
                value={serviceEmail}
                onChange={(e) => setServiceEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formServicePhone">
              <Form.Label>Service phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service phone"
                value={servicePhone}
                onChange={(e) => setServicePhone(e.target.value)}
              />
            </Form.Group>
            <h5>Service location</h5>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service city"
                value={serviceCity}
                onChange={(e) => setServiceCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formStreet">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter service street"
                value={serviceStreet}
                onChange={(e) => setServiceStreet(e.target.value)}
              />
            </Form.Group>

            <h5>Service Profile</h5>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Text className="text-muted">
                Provide a short engaging description of your service and its
                benefits for your customers.
              </Form.Text>
              <Form.Control
                as="textarea"
                rows={3}
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveUpdates}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
}

export default BusinessProfileCard;
