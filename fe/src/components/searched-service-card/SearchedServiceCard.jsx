import { Component } from "react";

export default class SearchedServiceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container-searched-card">
        <h1>{this.props.service.serviceName}</h1>
      </div>
    );
  }
}
