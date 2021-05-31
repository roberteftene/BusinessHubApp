import "./DashboardBusinessStats.css";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { IoIosHappy } from "react-icons/io";
import { HiCursorClick } from "react-icons/hi";
import { RiStarSFill } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { FaConciergeBell } from "react-icons/fa";
import VerticalBar from "../vertical-bar-reviewsRating/VerticalBar";
import BusinessService from "../../services/business/business.service";
import { useEffect, useState } from "react";
import AuthService from "../../services/auth/auth.service";
import cogoToast from "cogo-toast";
import VerticalBarBookings from "../vertical-bar-reviewsRating/VerticalBarBookings";

function DashboardBusinessStats(props) {
  const [graphicData, setGraphicData] = useState({});
  const userLoggedIn = AuthService.getLoggedUser();
  const [selectedPeriodOption, setSelectedPeriodOption] = useState("");
  const [startingPeriodDate, setStartingPeriodDate] = useState("");
  const [endingPeriodDate, setEndingPeriodDate] = useState("");
  const [bookingGraphicData, setBookingGraphicData] = useState([]);
  const [bookingGraphicDataByDay, setBookingGraphicDataByDay] = useState({});

  useEffect(() => {
    BusinessService.gatherDataForGraphic(
      props.businessData.serviceId,
      selectedPeriodOption,
      userLoggedIn.token
    ).then((res) => {
      const data = res.data;
      setGraphicData(data);
    });
  }, [selectedPeriodOption]);

  const handlePeriodChange = (e) => {
    let periodSelectedOption = document.querySelector(
      ".business-stats-period-option"
    ).value;
    setSelectedPeriodOption(periodSelectedOption);
  };

  const handleGenerateBtnClick = () => {
    let isValid = true;
    if (startingPeriodDate === "" || endingPeriodDate === "") {
      cogoToast.warn("You must enter a starting date and an ending date");
      isValid = false;
    }
    if (isValid) {
      BusinessService.gatherDataForBookingGraphic(
        props.businessData.serviceId,
        userLoggedIn.token,
        {
          startDate: startingPeriodDate,
          endDate: endingPeriodDate,
        }
      ).then((res) => {
        const resData = res.data;
        setBookingGraphicData(resData);
        setBookingGraphicDataByDay(resData.Monday);
      });

      const daysOptionContainer = document.querySelector(
        ".graphic-days-container"
      );
      daysOptionContainer.style.display = "flex";
    }
  };

  return (
    <div className="dashboard-business-stats-container">
      <div className="dashboard-header-section-container">
        <div className="dashboard-header-section">
          <h1 className="dashboard-business-title">
            {props.businessData.serviceName}
          </h1>
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
        <Col className="business-stats-card bookings-stats">
          <div className="business-stats-card-left">
            <span className="business-stats-card-title">Bookings</span>
            <span className="business-stats-card-value">
              {props.businessData.reservationModelsList.length}
            </span>
          </div>
          <div className="business-stats-card-right">
            <FaConciergeBell className="business-stats-card-icon" />
            <Button className="business-stats-card-btn reviews-btn">
              View more
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="dashboard-header-section graphic-options-container">
        <Form.Label className="graphic-label">
          <b>Select period for generating a graphic based on reviews</b>
        </Form.Label>
        <Form.Control
          as="select"
          className="business-stats-period-option"
          onChange={(e) => handlePeriodChange(e)}
        >
          <option value="TODAY">Today</option>
          <option value="THIS_MONTH">This month</option>
          <option value="FOREVER">All</option>
        </Form.Control>
      </Row>
      <Row className="dashboard-business-stats-graphic ">
        <div className="graphic-container">
          <VerticalBar graphicData={graphicData} />
        </div>
      </Row>

      <Row className="dashboard-header-section graphic-options-container">
        <Form.Label className="graphic-label">
          <b>Select a time range for generating a graphic based on bookings</b>
        </Form.Label>
        <div className="period-graphic">
          <Form.Label className="">Starting date</Form.Label>
          <Form.Control
            type="date"
            className="business-stats-period-option"
            onChange={(e) => setStartingPeriodDate(e.target.value)}
          ></Form.Control>
          <Form.Label className="">Ending date</Form.Label>
          <Form.Control
            type="date"
            className="business-stats-period-option"
            onChange={(e) => setEndingPeriodDate(e.target.value)}
          ></Form.Control>
          <Button
            variant="primary"
            className="generate-graphic-btn"
            onClick={() => handleGenerateBtnClick()}
          >
            Generate
          </Button>

          <div className="graphic-days-container">
            <span
              className="graphic-day-option"
              onClick={() =>
                setBookingGraphicDataByDay(bookingGraphicData.Monday)
              }
            >
              Monday
            </span>
            <span
              className="graphic-day-option"
              onClick={() =>
                setBookingGraphicDataByDay(bookingGraphicData.Tuesday)
              }
            >
              Tuesday
            </span>
            <span
              className="graphic-day-option"
              onClick={() =>
                setBookingGraphicDataByDay(bookingGraphicData.Wednesday)
              }
            >
              Wednesday
            </span>
            <span
              className="graphic-day-option"
              onClick={() =>
                setBookingGraphicDataByDay(bookingGraphicData.Thursday)
              }
            >
              Thursday
            </span>
            <span
              className="graphic-day-option"
              onClick={() =>
                setBookingGraphicDataByDay(bookingGraphicData.Friday)
              }
            >
              Friday
            </span>
            <span
              className="graphic-day-option"
              onClick={() =>
                setBookingGraphicDataByDay(bookingGraphicData.Saturday)
              }
            >
              Saturday
            </span>
            <span
              className="graphic-day-option"
              onClick={() =>
                setBookingGraphicDataByDay(bookingGraphicData.Sunday)
              }
            >
              Sunday
            </span>
          </div>
        </div>
      </Row>
      <Row className="dashboard-business-stats-graphic ">
        <div className="graphic-container">
          <VerticalBarBookings graphicData={bookingGraphicDataByDay} />
        </div>
      </Row>
    </div>
  );
}

export default DashboardBusinessStats;
