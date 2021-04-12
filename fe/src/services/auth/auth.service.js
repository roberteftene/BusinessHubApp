import axios from "axios";

const API_AUTH_URL = process.env.REACT_APP_API_AUTH_URL;

class AuthService {
  login(username, password) {
    return axios
      .post(API_AUTH_URL + "/signin", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_AUTH_URL + "/signup", {
      username,
      email,
      password,
    });
  }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
