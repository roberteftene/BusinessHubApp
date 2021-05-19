import { useEffect, useState } from "react";
import "./UserDetailsCard.css";
import AccountDetailsService from "../../services/account-details/accountdetails.service";
import AuthService from "../../services/auth/auth.service";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AiFillEyeInvisible } from "react-icons/ai";
import Button from "react-bootstrap/Button";

function UserDetailsCard() {
  const currLoggedUser = AuthService.getLoggedUser();
  const [currUserDetails, setCurrUserDetails] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("");

  useEffect(() => {
    AccountDetailsService.getUserDetailsByAccountId(
      currLoggedUser.token,
      currLoggedUser.id
    )
      .then((res) => {
        const currUserDetailsData = res.data;
        setCurrUserDetails(currUserDetailsData);
        setSubscriptionType(currUserDetailsData.subscriptionModel.type);
        console.log(currUserDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePasswordEyeClick = () => {
    if (visiblePassword === true) {
      setVisiblePassword(false);
    } else {
      setVisiblePassword(true);
    }
  };

  return (
    <div className="user-details-card-container">
      <Card style={{ width: "100%" }} className="user-details-card">
        <Card.Title className="user-details-card-title">
          Your account details
        </Card.Title>
        <Card.Body className="user-details-card-body">
          <Row>
            <Col>
              <Form.Group controlId="details-group-email">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={currLoggedUser.email} readOnly />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="details-group-username">
                <Form.Label>Username</Form.Label>
                <Form.Control value={currLoggedUser.username} readOnly />
              </Form.Group>
            </Col>
            <Col>
              {/*TODO: get password decrypted from backend */}
              <Form.Group controlId="details-group-password">
                <Form.Label>Password</Form.Label>
                <div className="password-control-group">
                  <Form.Control
                    type={visiblePassword === false ? "password" : "text"}
                    value="DASBDJKS*@dDANnk"
                    readOnly
                  ></Form.Control>
                  <AiFillEyeInvisible
                    onClick={() => handlePasswordEyeClick()}
                    className="password-eye"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="details-group-firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control value={currUserDetails.firstName} readOnly />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="details-group-lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control value={currUserDetails.lastName} readOnly />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="details-group-birthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control value={currUserDetails.birthday} readOnly />
              </Form.Group>
            </Col>
          </Row>
          {currLoggedUser.roles.includes("ROLE_BUSINESSOWNER") === true && (
            <>
              <Row md={3}>
                <Col>
                  <Form.Group controlId="details-group-subscription">
                    <Form.Label>Subscription Type</Form.Label>
                    <Form.Control readOnly value={subscriptionType} />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
        <Button className="edit-details-btn" variant="outline-primary">
          Edit details
        </Button>
      </Card>
    </div>
  );
}

export default UserDetailsCard;
