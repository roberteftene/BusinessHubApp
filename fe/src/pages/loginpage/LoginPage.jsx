import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SignInHero from "../../_assets/_img/signinHero.png";
import "./LoginPage.css";
import "../registerpage/RegisterPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import cogoToast from "cogo-toast";
import { withRouter, useHistory } from "react-router-dom";
import AuthService from "../../services/auth/auth.service";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;
    if (username.length < 3) {
      cogoToast.error("Username incorrect");
      valid = false;
    }
    if (password.length === 0) {
      cogoToast.error("The password is incorrect");
      valid = false;
    }

    if (valid) {
      AuthService.login(username, password)
        .then((res) => {
          cogoToast.success("Welcome " + username);
          history.push("/home");
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
            <img src={SignInHero} alt="Graphic image" />
          </div>
        </div>
      </Col>
      <Col className="presentation-col form-col">
        <div className="form-container">
          <h1>Sign In</h1>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleLogin(e)}
            >
              Explore
            </Button>
          </Form>
          <p className="already">
            Don't have an account?{" "}
            <a href="/signup" className="already-registered">
              Sign up for one
            </a>
          </p>
          <p className="already">
            Forgot your password?{" "}
            <a href="/signup" className="already-registered">
              Send recover mail
            </a>
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(LoginPage);
