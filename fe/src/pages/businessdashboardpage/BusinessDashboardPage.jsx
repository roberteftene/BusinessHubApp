import { Component } from "react";
import DashboardBusinessStats from "../../components/dashboard-business-stats/DashboardBusinessStats";
import "./BusinessDashboardPage.css";

export default class BusinessDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-page-container">
        <DashboardBusinessStats />
      </div>
    );
  }
}
