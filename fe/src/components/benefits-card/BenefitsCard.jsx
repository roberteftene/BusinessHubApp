import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import "./BenefitsCard.css";
import "../user-details-card/UserDetailsCard.css";
function BenefitsCard() {
  return (
    <div className="benefits-card-container">
      <Card className="benefits-card " style={{ width: "100%" }}>
        <Card.Body className="benefits-card-body">
          <span className="benefits-card-service-name">FotbalCafe</span>
          <Badge className={`benefits-reward-status badge-danger`}>
            EXPIRED
          </Badge>

          <span className="benefits-card-reward">50% discount</span>
          <span className="benefits-card-expiration">25-10-2022</span>

          <Button className="redeem-btn"> Redeem </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BenefitsCard;
