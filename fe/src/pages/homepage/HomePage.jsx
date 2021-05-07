import "./HomePage.css";
import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="homePage-container">
        <h1>Search for the greatest experiences</h1>
      </div>
    );
  }
}
