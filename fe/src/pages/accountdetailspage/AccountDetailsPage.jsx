import React from "react";
import { Col, Row } from "react-bootstrap";
import "./AccountDetailsPage.css";
import RocketImage from "../../_assets/_img/7750-[Converted].png";

function AccountDetailsPage() {
  return (
    <div className="detailsPage-container">
      <Row className="greetings-container">
        <Col sm={7} className="greetings-block-col">
          <div className="greetings-block">
            <h1 className="greetings-heading">Hi Robert!</h1>
            <p className="greetings-message">
              We are glad to see that you want to integrate your business in our
              hub. Please provide us a few more infos about you and your
              business before we get started.
            </p>
          </div>
        </Col>
        <Col sm={4}>
          <div className="greetings-image">
            <img src={RocketImage} alt="rocket" className="greetings-rocket" />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AccountDetailsPage;
