import "./DashboardBusinessStats.css";
import Form from "react-bootstrap/Form";

function DashboardBusinessStats() {
  return (
    <div className="dashboard-business-stats-container">
      <div className="dashboard-header-section-container">
        <div className="dashboard-header-section">
          <h1>Football Arena Cafe</h1>
          <Form.Label>
            Select period for generating statistic graphics
          </Form.Label>
          <Form.Control as="select">
            <option>Today</option>
            <option>This week</option>
            <option>This month</option>
            <option>All</option>
          </Form.Control>
        </div>
      </div>
    </div>
  );
}

export default DashboardBusinessStats;
