import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Col, Row } from "react-bootstrap";
import { Rating } from "@material-ui/lab";
import "./BusinessPresentationPage.css";
import BusinessService from "../../services/business/business.service";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { IoIosPin } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BiMessageAdd } from "react-icons/bi";
import Card from "react-bootstrap/Card";
import { FaPhoneAlt } from "react-icons/fa";
import MapContainer from "../../components/business-maps-location/MapContainer";
import ReviewService from "../../services/review/review.service";
import ReviewCard from "../../components/review-card/ReviewCard";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCgPWdoEYShIDmxcPQJgsuWZLuhZylyQCA");
Geocode.setLanguage("ro");

function BusinessPresentationPage() {
  const [businessDetails, setBusinessDetails] = useState({});
  const [workingHoursList, setWorkingHoursList] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [reviewArray, setReviewArray] = useState([]);
  const idObj = useParams();

  useEffect(() => {
    BusinessService.getBusinessById(idObj.id).then((res) => {
      const resData = res.data;
      setBusinessDetails(resData);
      setWorkingHoursList(res.data.workingHoursList);
    });
  }, []);

  useEffect(() => {
    Geocode.fromAddress(
      `Strada Iancu Căpitanu 30
      , Bucharest`
    ).then((res) => {
      const { lat, lng } = res.results[0].geometry.location;
      setLatitude(lat);
      setLongitude(lng);
    });
  }, []);

  useEffect(() => {
    ReviewService.getReviewsByBusinessId(idObj.id).then((res) => {
      const reviews = res.data;
      setReviewArray(reviews);
    });
  }, []);

  return (
    <div className="business-presentation-container">
      <div className="business-presentation">
        <Row className="business-shortcuts-row">
          <Col sm={6}>
            <h1 className="business-title-name">
              {businessDetails.serviceName}
            </h1>
            <Row>
              <Col className="business-second-row-col">
                <Rating
                  name="read-only"
                  value={businessDetails.rating || 0}
                  readOnly
                />
              </Col>
              <Col className="business-second-row-col">
                <span className="business-reviews">
                  {reviewArray.length} Reviews
                </span>
              </Col>
            </Row>
            <Row className="business-shortcut-contact">
              <div className="shortcut-contact shortcut-contact-location">
                <IoIosPin className="location-icon" />
                <span className=" business-presentation-location">
                  {businessDetails.address}, {businessDetails.city}
                </span>
              </div>
              <div className="shortcut-contact shortcut-contact-phone">
                <FaPhoneAlt className="phone-icon" />
                <span className="business-presentation-phone">
                  {businessDetails.servicePhone}
                </span>
              </div>
              <div className="shortcut-contact shortcut-contact-email">
                <MdEmail className="email-icon" />
                <span className="business-presentation-phone">
                  {businessDetails.serviceEmail}
                </span>
              </div>
            </Row>
          </Col>
          <Col className="business-shortcut-options-col" sm={6}>
            <div className="business-shortcut-options">
              <button className="business-shortcut-options-btn save-business-btn">
                <AiOutlineHeart className="shortcut-options-icon" /> Save
              </button>
              <button className="business-shortcut-options-btn ">
                <BiMessageAdd className="shortcut-options-icon" /> Add review
              </button>
              <button className="business-shortcut-options-btn ">
                <FiShare className="shortcut-options-icon" /> Share
              </button>
            </div>
          </Col>
        </Row>
        <Row className="business-shortcuts-row cards-section">
          <Col sm={3}>
            <Card
              style={{ width: "20rem" }}
              className="business-presentation-card"
            >
              <Card.Title className="business-presentation-card-title">
                Working hours
              </Card.Title>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted business-presentation-details-card-subtitle">
                  Consult the program of the service towards booking a
                  reservation. If certain days don't show it means there is no
                  available schedule for these days.
                </Card.Subtitle>
                {workingHoursList.map((workingDay) => {
                  return (
                    <Row
                      key={`row-${workingDay.dayOfWeek}`}
                      id="workingDay-row"
                      className="workingHour-schedule-section"
                    >
                      <Col>
                        <span>{workingDay.dayOfWeek}</span>
                      </Col>
                      <Col>
                        <span>{workingDay.startingHour} </span>
                        <span>- </span>
                        <span>{workingDay.closeHour}</span>
                      </Col>
                    </Row>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
          <Col sm={3}>
            <Card
              style={{ width: "20rem" }}
              className="business-presentation-card"
            >
              <Card.Title className="business-presentation-card-title">
                Details
              </Card.Title>

              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted business-presentation-details-card-subtitle">
                  Read a few words about this place story.
                </Card.Subtitle>
                <Card.Text className="business-presentation-fields">
                  <div>
                    <span>
                      <b>Category: </b> <br></br>
                      {businessDetails.category}
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Description: </b> <br></br>
                      {businessDetails.serviceDescription}
                    </span>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card
              style={{ width: "30rem" }}
              className="business-presentation-card"
            >
              <Card.Title className="business-presentation-card-title">
                Location and Contact
              </Card.Title>
              <Card.Body>
                <MapContainer latitude={latitude} longitude={longitude} />
                <div className="shortcut-contact shortcut-contact-location map-contact ">
                  <IoIosPin className="location-icon" />
                  <span className=" business-presentation-location">
                    {businessDetails.address}, {businessDetails.city}
                  </span>
                </div>
                <div className="shortcut-contact shortcut-contact-phone">
                  <FaPhoneAlt className="phone-icon" />
                  <span className="business-presentation-phone">
                    {businessDetails.servicePhone}
                  </span>
                </div>
                <div className="shortcut-contact shortcut-contact-email">
                  <MdEmail className="email-icon" />
                  <span className="business-presentation-phone">
                    {businessDetails.serviceEmail}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="business-shortcuts-row review-section">
          <Card style={{ width: "65%" }}>
            <Card.Title className="business-presentation-card-title reviews-card-title ">
              Reviews
            </Card.Title>
            <Card.Body className="review-section-body">
              {reviewArray.map((review) => {
                return <ReviewCard key={review.reviewId} reviewData={review} />;
              })}
            </Card.Body>
          </Card>
        </Row>
      </div>
    </div>
  );
}

export default BusinessPresentationPage;
