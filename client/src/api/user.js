import axios from "./index";
class UserApi {
  static GetByRole = (data) => {
    return axios.get(`users/role/${data}`);
  };

  static GetRole = (data) => {
    return axios.get(`users/user/role/${data}`);
  };

  static GetUnassignedCount = () => {
    return axios.get(`users/countUnassigned/`);
  };

  static AssignTask = (data) => {
    return axios.post(`users/assign/`, data);
  };

  static UnAssignTask = (data) => {
    return axios.post(`users/unassign/`, data);
  };
}

export default UserApi;
