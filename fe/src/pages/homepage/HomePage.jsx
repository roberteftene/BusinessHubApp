import "./HomePage.css";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import abstractBanner from "../../_assets/_img/aaron-burden-qJrg0ANseFE-unsplash.jpg";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import { FaRocket } from "react-icons/fa";
import SearchedServiceCard from "../../components/searched-service-card/SearchedServiceCard";
import BusinessService from "../../services/business/business.service";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      categories: ["Relax", "Healthy", "Other", "Social", "Beauty"],
      searchedServices: [],
      cities: new Set(),
    };
  }

  componentDidMount() {
    BusinessService.getAllBusinesses().then((res) => {
      const result = res.data;
      this.setState({ businesses: result });
      var uniqueCities = new Set();
      res.data.forEach((el) => {
        uniqueCities.add(el.location);
      });
      this.setState({ cities: uniqueCities });
    });
  }

  handleExplore = () => {
    let citySelected = document.querySelector(".citySelect").value;
    let categorySelected = document.querySelector(".categorySelect").value;
    console.log(citySelected + categorySelected);
    var searchedData = [];
    this.state.businesses.forEach((business) => {
      if (
        business.category.toLowerCase() === categorySelected.toLowerCase() &&
        business.location.includes(citySelected)
      ) {
        searchedData.push(business);
      }
    });
    this.setState({ searchedServices: searchedData });
  };

  render() {
    return (
      <div className="container-homepage-big">
        <div className="homePage-container">
          <Card className="homepage-search-card" style={{ width: "80rem" }}>
            <Card.Img
              variant="top"
              className="header-banner"
              src={abstractBanner}
            />
            <Card.Body>
              <Card.Title className="homepage-search-title">
                Hi there <b>adventurer</b>, what's gonna be today?
              </Card.Title>
              <Card.Text className="homepage-search-description">
                Please provide the below information for the best results
              </Card.Text>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="typeOfServiceControlSelect">
                      <Form.Label>Type of service</Form.Label>
                      <Form.Control
                        as="select"
                        custom
                        className="categorySelect"
                      >
                        {this.state.categories.map((el) => {
                          return <option>{el}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="locationControlSelect">
                      <Form.Label>Location</Form.Label>
                      <Form.Control as="select" custom className="citySelect">
                        {[...this.state.cities].map((city) => {
                          return <option>{city}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <Button
                className="homepage-btn-explore"
                variant="primary"
                onClick={() => this.handleExplore()}
              >
                <FaRocket></FaRocket> Explore
              </Button>
            </Card.Body>
          </Card>

          <div className="searched-container">
            {this.state.searchedServices.map((el) => {
              return <SearchedServiceCard service={el}></SearchedServiceCard>;
            })}
          </div>
        </div>
      </div>
    );
  }
}
