import BusinessProfileCard from "../../components/business-profile-card/BusinessProfileCard";
import "./BusinessProfilePage.css";
import BusinessService from "../../services/business/business.service";
import AuthService from "../../services/auth/auth.service";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
function BusinessProfilePage() {
  const currLoggedUser = AuthService.getLoggedUser();
  const [businessesArray, setBusinessesArray] = useState([]);

  useEffect(() => {
    BusinessService.getBusinessesByUserId(
      currLoggedUser.id,
      currLoggedUser.token
    ).then((res) => {
      const result = res.data;
      setBusinessesArray(result);
    });
  }, []);
  return (
    <div className="business-profile-page-container">
      <div className="business-profile-page">
        <Button variant="primary" className="add-service-btn">
          <AiFillPlusCircle className="add-service-icon" /> Add service
        </Button>

        {businessesArray.map((business) => {
          return (
            <BusinessProfileCard
              key={business.serviceId}
              business={business}
            ></BusinessProfileCard>
          );
        })}
      </div>
    </div>
  );
}

export default BusinessProfilePage;
