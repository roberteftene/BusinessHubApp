import BusinessProfileCard from "../../components/business-profile-card/BusinessProfileCard";
import "./BusinessProfilePage.css";

function BusinessProfilePage() {
  return (
    <div className="business-profile-page-container">
      <div className="business-profile-page">
        <BusinessProfileCard />
        <BusinessProfileCard />
        <BusinessProfileCard />
      </div>
    </div>
  );
}

export default BusinessProfilePage;
