import { useEffect, useState } from "react";
import "./AddReviewFormPage.css";
import BusinessService from "../../services/business/business.service";
import { useParams } from "react-router";
import Form from "react-bootstrap/Form";
import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { Button } from "react-bootstrap";
import AuthService from "../../services/auth/auth.service";
import ReviewService from "../../services/review/review.service";
import { useHistory } from "react-router";

const labels = {
  1: "Terrible",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function AddReviewFormPage() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [reviewedService, setReviewedService] = useState({});
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const history = useHistory();

  const idObj = useParams();
  const currLoggedUser = AuthService.getLoggedUser();
  useEffect(() => {
    BusinessService.getBusinessById(idObj.id).then((res) => {
      const businessData = res.data;
      setReviewedService(businessData);
    });
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (currLoggedUser === null) {
      //TODO: api for guest adding review
      console.log("Nu e user");
    } else {
      const reqBody = {
        reviewTitle: reviewTitle,
        noLikes: 0,
        reviewDescription: reviewDescription,
        reviewRating: value,
        visitDate: visitDate,
      };
      ReviewService.saveReview(currLoggedUser.id, idObj.id, reqBody)
        .then(() => {
          history.push(`/business/${idObj.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="review-form-container">
      <div className="form-body">
        <div className="form-header">
          <div className="form-header-business">
            <h1>{reviewedService.serviceName}</h1>
            <span>{reviewedService.serviceDescription}</span>
          </div>
          <div className="form-header-thanks-block">
            <span className="form-header-thanks">
              Your first-hand experiences really help others.
              <b>Thanks for that!</b>
            </span>
            <br></br>
            <span className="form-header-thanks">
              Also, adding reviews increase your <b>fidelity rank.</b>
            </span>
          </div>
        </div>
        <div className="form-content">
          <Form className="review-form">
            <Form.Label>Your overall rating</Form.Label>
            <div className="review-rating-container">
              <Rating
                name="hover-feedback"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {value !== null && (
                <Box className="review-rating-description" ml={2}>
                  {labels[hover !== -1 ? hover : value]}
                </Box>
              )}
            </div>

            <Form.Group controlId="control control-reviewTitle">
              <Form.Label>Title of the review</Form.Label>
              <Form.Control
                type="text"
                placeholder="Summarize your experience or highlight an important detail"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="control control-reviewContent">
              <Form.Label>Your review</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Tell people about your experience, it was how you expected?"
                value={reviewDescription}
                onChange={(e) => setReviewDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="control control-reviewVisit">
              <Form.Label>When did you visit?</Form.Label>
              <Form.Control
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                type="date"
                placeholder="Enter date of visit"
              />
            </Form.Group>
          </Form>
        </div>
        <div className="form-footer">
          <Button
            onClick={(e) => handleSubmitReview(e)}
            variant="primary"
            className="submit-review-btn"
          >
            Send review
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddReviewFormPage;
