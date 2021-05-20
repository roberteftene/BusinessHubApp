import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

class ReviewService {
  saveReview(currentUserId, businessId, businessObj) {
    return axios.post(
      `${API_URL}reviews/${currentUserId}/${businessId}`,
      businessObj
    );
  }

  saveReviewByGuest(businessId, businessObj) {
    return axios.post(`${API_URL}reviews/${businessId}`, businessObj);
  }

  getReviewsByBusinessId(businessId) {
    return axios.get(`${API_URL}reviews/${businessId}`);
  }
}

export default new ReviewService();
