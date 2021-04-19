import axios from "axios";

const API_AUTH_URL = process.env.REACT_APP_API_BASE_URL;

class SubscriptionService {
  getSubscriptions() {
    return axios.get(API_AUTH_URL + "subscription").then((res) => {
      return res;
    });
  }
}

export default new SubscriptionService();
