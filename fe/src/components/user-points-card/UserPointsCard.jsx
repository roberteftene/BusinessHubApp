import "./UserPointsCard.css";
import Card from "react-bootstrap/Card";
import userPng from "../../_assets/_img/DSC_1993.jpg";
import AuthService from "../../services/auth/auth.service";
import { Col, Row } from "react-bootstrap";
import { AiFillHeart } from "react-icons/ai";
import { MdTagFaces } from "react-icons/md";
import { GiRank3 } from "react-icons/gi";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
function UserPointsCard() {
  const currLoggedUser = AuthService.getLoggedUser();

  const popoverFidelityPoints = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Fidelity points</Popover.Title>
      <Popover.Content>
        <strong>Fidelity points</strong> can be gained if you submit reviews or
        if you are simply, <b>fidel</b>. With these points you can obtain
        rewards!
      </Popover.Content>
    </Popover>
  );

  const popoverNoReviews = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Reviews added</Popover.Title>
      <Popover.Content>
        Here is a track of the total of reviews added by you.
      </Popover.Content>
    </Popover>
  );

  const popoverNoLikes = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Appreciations gained</Popover.Title>
      <Popover.Content>
        This is the total number of appreciations obtained by your reviews.
        Congrats!
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="user-points-card-container">
      <Card className="user-points-card" style={{ width: "50%" }}>
        <div className="profile-png-container">
          <Card.Img className="profile-png" variant="top" src={userPng} />
        </div>
        <Card.Body>
          <Card.Title>{currLoggedUser.username}</Card.Title>
          <Card.Subtitle className="user-points-card-subtitle">
            Hover the numbers to find out their meaning
          </Card.Subtitle>
          <Row>
            <Col>
              <div className="points-status points-status-reviews">
                <AiFillHeart className="points-icon" />
                <OverlayTrigger
                  trigger="hover"
                  placement="left"
                  overlay={popoverNoLikes}
                >
                  <span className="points">138</span>
                </OverlayTrigger>
              </div>
            </Col>
            <Col>
              <div className="points-status points-status-likes">
                <MdTagFaces className="points-icon" />
                <OverlayTrigger
                  trigger="hover"
                  placement="bottom"
                  overlay={popoverNoReviews}
                >
                  <span className="points">240</span>
                </OverlayTrigger>
              </div>
            </Col>
            <Col>
              <div className="points-status points-status-fidelity">
                <GiRank3 className="points-icon" />
                <OverlayTrigger
                  trigger="hover"
                  placement="right"
                  overlay={popoverFidelityPoints}
                >
                  <span className="points">24</span>
                </OverlayTrigger>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserPointsCard;
