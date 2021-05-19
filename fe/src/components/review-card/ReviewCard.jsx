import { Component } from "react";
import { Card } from "react-bootstrap";
import { Rating } from "@material-ui/lab";
import { AiFillLike } from "react-icons/ai";
import "./ReviewCard.css";
export default class ReviewCard extends Component {
  constructor(props) {
    super(props);
    this.dateSliced = props.reviewData.reviewDate.slice(0, 10);
    this.jsDate = new Date(this.dateSliced);
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    this.formattedDate = this.jsDate.toLocaleDateString("en-US", options);

    this.dateArray = props.reviewData.visitDate.split("-");
    this.jsVisitDate = new Date(
      `${this.dateArray[2]}-${this.dateArray[1]}-${this.dateArray[0]}`
    );
    this.formattedVisitDate = this.jsVisitDate.toLocaleDateString(
      "en-us",
      options
    );
  }

  render() {
    return (
      <div className="review-card-container">
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>{this.props.reviewData.reviewTitle}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted review-card-subtitle">
              <Rating
                name="read-only"
                value={this.props.reviewData.reviewRating}
                readOnly
              />
              <span className="review-date">
                Reviewed on {this.formattedDate}
              </span>
            </Card.Subtitle>
            <Card.Text>{this.props.reviewData.reviewDescription}</Card.Text>
            <Card.Text className="review-visit-date">
              Visited on {this.formattedVisitDate}
            </Card.Text>
            <div className="review-like-section">
              <span>Helpful ?</span>
              <AiFillLike className="likeReview-btn" />
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
