import { useEffect } from "react";
import { useState } from "react";
import authService from "../../services/auth/auth.service";
import businessService from "../../services/business/business.service";
import SearchedServiceCard from "../searched-service-card/SearchedServiceCard";

function UserFavoritesContainer(props) {
  const userLogged = authService.getLoggedUser();
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    businessService.getFavorites(userLogged.id).then((res) => {
      const data = res.data;
      setUserFavorites(data);
    });
  }, []);
  return (
    <>
      <span className="user-details-card-title" style={{ width: "80%" }}>
        Your bookings
      </span>
      {userFavorites.map((favorite) => {
        return <SearchedServiceCard service={favorite}></SearchedServiceCard>;
      })}
    </>
  );
}

export default UserFavoritesContainer;
