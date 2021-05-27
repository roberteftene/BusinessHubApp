import { Component } from "react";
import { Rating } from "@material-ui/lab";
import Card from "react-bootstrap/Card";
import "./TopServiceCard.css";
import Badge from "react-bootstrap/Badge";
import RelaxBanner from "../../_assets/_img/cesar-aloy-3glv055ZwdE-unsplash.jpg";
import { BsFillStarFill } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import Table from "react-bootstrap/Table";

export default class TopServiceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceIndex: 0,
      badgeCategory: "",
    };
  }

  componentDidMount() {
    let index = this.props.index;
    index++;
    this.setState({ serviceIndex: index });

    switch (this.props.service.category) {
      case "RELAX":
        this.setState({ badgeCategory: "badge-info" });
        break;
      case "HEALTHY":
        this.setState({ badgeCategory: "badge-success" });
        break;
      default:
        this.setState({ badgeCategory: "badge-primary" });
    }
  }

  render() {
    return (
      <Card
        className="searched-card community-top-card"
        style={{ width: "100%" }}
      >
        <Card.Body className="community-card-body">
          <Card.Title className="community-card-title-section">
            <span className="community-service-index">
              {this.state.serviceIndex}
            </span>
            <Badge className={`category-badge ${this.state.badgeCategory}`}>
              {this.props.service.category}
            </Badge>
            <div className="small-section-title">
              <span className="community-service-title">
                {this.props.service.serviceName}
              </span>
              <span className="community-service-rating">
                {this.props.service.rating}
                <BsFillStarFill className="star-icon" />
              </span>
            </div>
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text>
            {this.props.service.serviceDescription.slice(0, 30)}
          </Card.Text>
          <Card.Link className="community-card-view-more-btn" href="#">
            View more
            <FaLocationArrow className="view-more-icon" />
          </Card.Link>
        </Card.Body>
      </Card>
    );
  }
}
