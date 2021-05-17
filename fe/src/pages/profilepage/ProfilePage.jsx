import { Component } from "react";
import "./ProfilePage.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import UserDetailsCard from "../../components/user-details-card/UserDetailsCard";
import UserPointsCard from "../../components/user-points-card/UserPointsCard";
import BenefitsCard from "../../components/benefits-card/BenefitsCard";
import Card from "react-bootstrap/Card";
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOptionClick = (e) => {
    const optionArray = document.querySelectorAll(".navbar-nav")[0];
    optionArray.childNodes.forEach((element) => {
      element.classList.remove("profile-active-option");
    });
    const optionClicked = document.querySelectorAll(
      `.${e.target.classList[0]}`
    )[0];
    optionClicked.classList.add("profile-active-option");
  };

  render() {
    return (
      <div className="profile-page-container">
        <Navbar className="top-nav" fixed="top">
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link
                className="details-link-option profile-active-option"
                onClick={(e) => this.handleOptionClick(e)}
              >
                Details
              </Nav.Link>
              <Nav.Link
                className="rezervation-link-option"
                onClick={(e) => this.handleOptionClick(e)}
              >
                Reservation
              </Nav.Link>
              <Nav.Link
                className="reviews-link-option"
                onClick={(e) => this.handleOptionClick(e)}
              >
                Reviews
              </Nav.Link>

              <Nav.Link
                className="favorite-link-option"
                onClick={(e) => this.handleOptionClick(e)}
              >
                Favorite
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Row className="profile-top-row">
          <Col>
            <UserPointsCard></UserPointsCard>
          </Col>
          <Col>
            <Row>
              <UserDetailsCard></UserDetailsCard>
            </Row>
            <Row>
              <Card className="benefits-card user-details-card-container">
                <Card.Title className="user-details-card-title">
                  Your benefits
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted benefits-card-subtitle">
                  Redeem the rewards before their expiration date, and next
                  booking use the generated code to beneficiate from your
                  reward.
                </Card.Subtitle>
                <Card.Body className="benefits-card-container-body">
                  <BenefitsCard></BenefitsCard>
                  <BenefitsCard></BenefitsCard>
                  <BenefitsCard></BenefitsCard>
                  <BenefitsCard></BenefitsCard>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
