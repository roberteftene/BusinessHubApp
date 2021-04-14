import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SignUpHero from "../../_assets/_img/signupHero.png";
import Form from "react-bootstrap/Form";
import "./RegisterPage.css";
import React, { useState } from "react";
import { isEmail } from "validator";
import cogoToast from "cogo-toast";
import { withRouter, useHistory } from "react-router-dom";
import AuthService from "../../services/auth/auth.service";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasService, setHasService] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (username.length < 3) {
      cogoToast.error("Please enter the entire name");
      valid = false;
    }
    if (!isEmail(email)) {
      cogoToast.error("Please enter a valid email");
      valid = false;
    }
    if (password.length < 3) {
      cogoToast.error("Please enter a stronger password");
      valid = false;
    }

    if (valid) {
      AuthService.register(username, email, password)
        .then(() => {
          cogoToast.success("Successfully registered");
          AuthService.login(username, password).then(() =>
            history.push("/accountdetails")
          );
        })
        .catch((e) => cogoToast.warn(e.message));
    }
  };

  return (
    <Row>
      <Col className="presentation-col details-col">
        <div className="details-container">
          <h1 className="details-heading">HubExp</h1>
          <p className="details-description">
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
      <Col className="presentation-col form-col">
        <div className="form-container">
          <h1>Sign Up</h1>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCheckbox">
              <Form.Text className="text-muted">
                I have a business which I want to integrate in this platform.
              </Form.Text>
              <Form.Check
                type="switch"
                label=""
                onChange={(e) => setHasService(e.target.checked)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
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

export default withRouter(RegisterPage);
