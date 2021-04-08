import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SignUpHero from "../../_assets/_img/signupHero.png";
import Form from "react-bootstrap/Form";
import "./RegisterPage.css";
import React from "react";

function RegisterPage() {
  return (
    <Row>
      <Col className="register-col register-details-col">
        <div className="register-details-container">
          <h1 className="register-details-heading">HubExp</h1>
          <p className="register-details-description">
            Create an account to be able to benefit from discounts on your
            favorite services, but also on notifications to stay up to date with
            everything that happens. If you are a happy owner of a service,
            register now and you will benefit from an intelligent system to
            promote your service within the application.
          </p>
          <div className="img-container">
            <img src={SignUpHero} alt="Graphic image" />
          </div>
        </div>
      </Col>
      <Col className="register-col register-form-col">
        <div className="register-form-container">
          <h1>Sign Up</h1>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Full name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formCheckbox">
              <Form.Text className="text-muted">
                I have a business which I want to integrate in this platform.
              </Form.Text>
              <Form.Check type="switch" label="" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Next step
            </Button>
          </Form>
          <p className="already">
            Already registered?{" "}
            <a href="/signin" className="already-registered">
              Sign in
            </a>
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default RegisterPage;
