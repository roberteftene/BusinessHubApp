import axios from "axios";

const API_URL = process.env.REACT_APP_API_AUTH_URL;

class AccountDetailsService {
  saveUserDetails(reqBody, token, currentUserId, subscriptionId) {
    return axios.post(
      `${API_URL}/account-details/${currentUserId}/${subscriptionId}`,

      reqBody,

      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  getUserDetailsByAccountId(token, currentUserId) {
    return axios.get(`${API_URL}/account-details/${currentUserId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new AccountDetailsService();
