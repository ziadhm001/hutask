import axios from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`users/login`, data);
  };

  static Logout = (data) => {
    return axios.post(`users/logout`, data, {
      headers: { Authorization: `${data.token}` },
    });
  };
}

export default AuthApi;
