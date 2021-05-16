import { Component } from "react";
import "./ProfilePage.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import UserDetailsCard from "../../components/user-details-card/UserDetailsCard";
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
                className="benefits-link-option"
                onClick={(e) => this.handleOptionClick(e)}
              >
                Benefits
              </Nav.Link>
              <Nav.Link
                className="favorite-link-option"
                onClick={(e) => this.handleOptionClick(e)}
              >
                Favorite
              </Nav.Link>
              <Nav.Link
                className="history-link-option"
                onClick={(e) => this.handleOptionClick(e)}
              >
                History
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Row className="profile-top-row">
          <UserDetailsCard></UserDetailsCard>
        </Row>
      </div>
    );
  }
}
