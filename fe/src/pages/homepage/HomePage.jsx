import "./HomePage.css";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ocean from "../../_assets/_img/jeremy-bishop-C-opW0i5McE-unsplash.jpg";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { FaRocket } from "react-icons/fa";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-homepage-big">
        <div className="homePage-container">
          <Card className="homepage-search-card" style={{ width: "80rem" }}>
            <Card.Img variant="top" class="header-banner" src={ocean} />
            <Card.Body>
              <Card.Title className="homepage-search-title">
                Good day <b>adventurer</b>, what's gonna be today?
              </Card.Title>
              <Card.Text className="homepage-search-description">
                Please provide the below information for the best results
              </Card.Text>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="typeOfServiceControlSelect">
                      <Form.Label>Type of service</Form.Label>
                      <Form.Control as="select" custom>
                        <option>Healthy</option>
                        <option>Sportive</option>
                        <option>Relax</option>
                        <option>Social</option>
                        <option>Beauty</option>
                        <option>None</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="locationControlSelect">
                      <Form.Label>Location</Form.Label>
                      <Form.Control as="select" custom>
                        <option>Bucharest</option>
                        <option>Pitesti</option>
                        <option>Cluj</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <Button className="homepage-btn-explore" variant="primary">
                <FaRocket></FaRocket> Explore
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
