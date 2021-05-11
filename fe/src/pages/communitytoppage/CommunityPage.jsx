import { Component } from "react";
import { Col, Row } from "react-bootstrap";
import BusinessService from "../../services/business/business.service";
import TopServiceCard from "../../components/top-service-card/TopServiceCard";
import "./CommunityPage.css";

export default class CommunityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noReviewsImportanceIndex: 0.4,
      ratingImportanceIndex: 0.6,
      communityTop: [],
    };
  }

  componentDidMount() {
    BusinessService.getComputedCommunityTop({
      noReviewsImportanceIndex: this.state.noReviewsImportanceIndex,
      ratingImportanceIndex: this.state.ratingImportanceIndex,
    }).then((res) => {
      const top = res.data;
      this.setState({ communityTop: top });
    });
  }

  render() {
    return (
      <div className="community-page-container">
        <Row className="community-top-row">
          <Col>
            <h1 className="community-heading">
              The most reviewed and the highly rated experiences
            </h1>
            {this.state.communityTop.map((el) => {
              return (
                <TopServiceCard
                  className="community-service-cards"
                  index={this.state.communityTop.indexOf(el, 0)}
                  service={el}
                ></TopServiceCard>
              );
            })}
          </Col>
        </Row>
      </div>
    );
  }
}
