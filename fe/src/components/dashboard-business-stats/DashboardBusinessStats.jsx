import "./DashboardBusinessStats.css";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { IoIosHappy } from "react-icons/io";
import { HiCursorClick } from "react-icons/hi";
import { RiStarSFill } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { FaConciergeBell } from "react-icons/fa";
import VerticalBar from "../vertical-bar-reviewsRating/VerticalBar";

function DashboardBusinessStats(props) {
  return (
    <div className="dashboard-business-stats-container">
      <div className="dashboard-header-section-container">
        <div className="dashboard-header-section">
          <h1 className="dashboard-business-title">
            {props.businessData.serviceName}
          </h1>
          <Form.Label>
            Select period for generating statistic graphics
          </Form.Label>
          <Form.Control as="select">
            <option>Today</option>
            <option>This week</option>
            <option>This month</option>
            <option>All</option>
          </Form.Control>
        </div>
      </div>
      <Row className="dashboard-business-stats-card">
        <Col className="business-stats-card reviews-stats">
          <div className="business-stats-card-left">
            <span className="business-stats-card-title">Reviews</span>
            <span className="business-stats-card-value">
              {props.businessData.reviewModelList.length}
            </span>
          </div>
          <div className="business-stats-card-right">
            <IoIosHappy className="business-stats-card-icon" />
            <Button className="business-stats-card-btn reviews-btn">
              View more
            </Button>
          </div>
        </Col>
        <Col className="business-stats-card stars-stats">
          <div className="business-stats-card-left">
            <span className="business-stats-card-title">Rating</span>
            <span className="business-stats-card-value">
              {Math.round((props.businessData.rating + Number.EPSILON) * 100) /
                100}
            </span>
          </div>
          <div className="business-stats-card-right">
            <RiStarSFill className="business-stats-card-icon" />
            <Button className="business-stats-card-btn reviews-btn">
              View more
            </Button>
          </div>
        </Col>
        <Col className="business-stats-card clicks-stats">
          <div className="business-stats-card-left">
            <span className="business-stats-card-title">Clicks</span>
            <span className="business-stats-card-value">2.310</span>
          </div>
          <div className="business-stats-card-right">
            <HiCursorClick className="business-stats-card-icon" />
            <Button className="business-stats-card-btn reviews-btn">
              View more
            </Button>
          </div>
        </Col>
        <Col className="business-stats-card bookings-stats">
          <div className="business-stats-card-left">
            <span className="business-stats-card-title">Bookings</span>
            <span className="business-stats-card-value">310</span>
          </div>
          <div className="business-stats-card-right">
            <FaConciergeBell className="business-stats-card-icon" />
            <Button className="business-stats-card-btn reviews-btn">
              View more
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="dashboard-business-stats-graphic ">
        <div className="graphic-container">
          <VerticalBar />
        </div>
      </Row>
    </div>
  );
}

export default DashboardBusinessStats;
