import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

class BusinessService {
  saveBusiness(reqBody, token, currentUserId) {
    return axios.post(
      `${API_URL}services/${currentUserId}`,

      reqBody,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  getAllBusinesses() {
    return axios.get(`${API_URL}services`);
  }

  getComputedCommunityTop(reqBody) {
    return axios.post(`${API_URL}services/communityTop`, reqBody);
  }

  getBusinessesByUserId(currentUserId, token) {
    return axios.get(`${API_URL}services/${currentUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getBusinessById(serviceId) {
    return axios.get(`${API_URL}services/presentation/${serviceId}`);
  }
}

export default new BusinessService();
