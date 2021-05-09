import { Component } from "react";
import { Rating } from "@material-ui/lab";
import Card from "react-bootstrap/Card";
import "./SearchedServiceCard.css";

export default class SearchedServiceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card className="searched-card" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{this.props.service.serviceName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <Rating
              name="read-only"
              value={this.props.service.rating}
              readOnly
            />
            <p className="searched-service-category">
              {this.props.service.category}
            </p>
          </Card.Subtitle>
          <Card.Text>{this.props.service.serviceDescription}</Card.Text>
          <Card.Link href="#">View more</Card.Link>
        </Card.Body>
      </Card>
    );
  }
}
