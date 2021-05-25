import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

class UserService {
  addEmployee(serviceId, token, username) {
    return axios.post(`${API_URL}account/employees/${serviceId}`, username, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getEmployeesByOwnerId(ownerId, token) {
    return axios.get(`${API_URL}account/employees/${ownerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  removeEmployee(username, token) {
    return axios.put(`${API_URL}account/employees`, username, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default new UserService();
