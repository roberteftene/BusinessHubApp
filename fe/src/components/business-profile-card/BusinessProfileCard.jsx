import "./BusinessProfileCard.css";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../user-details-card/UserDetailsCard.css";
import "./BusinessProfileCard.css";

function BusinessProfileCard(props) {
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
        <Button className="edit-details-btn" variant="outline-primary">
          Edit details
        </Button>
      </Card>
    </div>
  );
}

export default BusinessProfileCard;
