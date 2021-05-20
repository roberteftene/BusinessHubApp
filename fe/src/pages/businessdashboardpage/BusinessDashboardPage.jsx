import { Component } from "react";
import DashboardBusinessStats from "../../components/dashboard-business-stats/DashboardBusinessStats";
import "./BusinessDashboardPage.css";
import BusinessService from "../../services/business/business.service";
import AuthService from "../../services/auth/auth.service";
export default class BusinessDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessArray: [],
    };
  }

  componentDidMount() {
    const currLoggedUser = AuthService.getLoggedUser();
    BusinessService.getBusinessesByUserId(
      currLoggedUser.id,
      currLoggedUser.token
    ).then((res) => {
      const arrayData = res.data;
      this.setState({ businessArray: arrayData });
    });
  }

  render() {
    return (
      <div className="dashboard-page-container">
        {this.state.businessArray.map((business) => {
          return <DashboardBusinessStats businessData={business} />;
        })}
      </div>
    );
  }
}
