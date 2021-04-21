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
}

export default new BusinessService();
