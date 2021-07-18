import { Component } from "react";
import "./ProfilePage.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import UserDetailsCard from "../../components/user-details-card/UserDetailsCard";
import UserPointsCard from "../../components/user-points-card/UserPointsCard";
import BenefitsCard from "../../components/benefits-card/BenefitsCard";
import Card from "react-bootstrap/Card";
import ReservationsCard from "../../components/reservations-card/ReservationsCard";
import ReviewCard from "../../components/review-card/ReviewCard";
import UserReviewsContainer from "../../components/user-reviews-container/UserReviewsContainer";
import UserFavoritesContainer from "../../components/user-favorites-container/UserFavoritesContainer";
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOption: {
        isDetails: true,
        isReservations: false,
        isReviews: false,
        isFavorites: false,
      },
    };
  }

  handleOptionClick = (e, option) => {
    const optionArray = document.querySelectorAll(".navbar-nav")[0];
    optionArray.childNodes.forEach((element) => {
      element.classList.remove("profile-active-option");
    });
    const optionClicked = document.querySelectorAll(
      `.${e.target.classList[0]}`
    )[0];
    optionClicked.classList.add("profile-active-option");

    switch (option) {
      case "details":
        this.setState({
          menuOption: {
            isDetails: true,
            isReservations: false,
            isReview: false,
            isFavorites: false,
          },
        });
        break;
      case "reservation":
        this.setState({
          menuOption: {
            isDetails: false,
            isReservations: true,
            isReview: false,
            isFavorites: false,
          },
        });
        break;
      case "reviews":
        this.setState({
          menuOption: {
            isDetails: false,
            isReservations: false,
            isReview: true,
            isFavorites: false,
          },
        });
        break;
      case "favorites":
        this.setState({
          menuOption: {
            isDetails: false,
            isReservations: false,
            isReview: false,
            isFavorites: true,
          },
        });
        break;
      default:
        this.setState({
          menuOption: {
            isDetails: true,
            isReservations: false,
            isReview: false,
            isFavorites: false,
          },
        });
        break;
    }
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
                onClick={(e) => this.handleOptionClick(e, "details")}
              >
                Details
              </Nav.Link>
              <Nav.Link
                className="rezervation-link-option"
                onClick={(e) => this.handleOptionClick(e, "reservation")}
              >
                Reservation
              </Nav.Link>
              <Nav.Link
                className="reviews-link-option"
                onClick={(e) => this.handleOptionClick(e, "reviews")}
              >
                Reviews
              </Nav.Link>

              <Nav.Link
                className="favorite-link-option"
                onClick={(e) => this.handleOptionClick(e, "favorites")}
              >
                Favorite
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.state.menuOption.isDetails && (
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
        )}
        {this.state.menuOption.isReservations && (
          <Row className="profile-top-row">
            <ReservationsCard></ReservationsCard>
          </Row>
        )}
        {this.state.menuOption.isReview && (
          <Row
            className="profile-top-row"
            style={{ width: "60%", marginTop: "5%" }}
          >
            <UserReviewsContainer></UserReviewsContainer>
          </Row>
        )}
        {this.state.menuOption.isFavorites && (
          <Row
            className="profile-top-row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <UserFavoritesContainer></UserFavoritesContainer>
          </Row>
        )}
      </div>
    );
  }
}
