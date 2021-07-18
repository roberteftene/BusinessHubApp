import { useEffect } from "react";
import { useState } from "react";
import AuthService from "../../services/auth/auth.service";
import reviewService from "../../services/review/review.service";
import ReviewCard from "../review-card/ReviewCard";

function UserReviewsContainer(props) {
  const currLoggedUser = AuthService.getLoggedUser();
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    reviewService.getReviewsByUserId(currLoggedUser.id).then((res) => {
      const data = res.data;
      setUserReviews(data);
    });
  }, []);

  return (
    <>
      <span className="user-details-card-title" style={{ width: "80%" }}>
        Your Reviews
      </span>
      {userReviews.map((review) => {
        return <ReviewCard reviewData={review}></ReviewCard>;
      })}
    </>
  );
}

export default UserReviewsContainer;
