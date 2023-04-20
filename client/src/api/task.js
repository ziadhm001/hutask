import axios from "./index";
class TaskApi {
  static Get = () => {
    return axios.get(`tasks/`);
  };

  static GetTask = (data) => {
    return axios.get(`tasks/task/${data._id}`);
  };

  static GetCount = () => {
    return axios.get(`tasks/count/`);
  };

  static UpdateTask = (_id, data) => {
    return axios.put(`tasks/task/${_id}`, data);
  };

  static GetCountCompleted = () => {
    return axios.get(`tasks/countCompleted/`);
  };

  static GetAssignedTasks = (data) => {
    return axios.get(`tasks/assigned/${data._id}`);
  };

  static GetCountOngoing = () => {
    return axios.get(`tasks/countOngoing/`);
  };

  static GetManager = (data) => {
    return axios.post(`tasks/manager`, data);
  };

  static GetMCountOngoing = (data) => {
    return axios.post(`tasks/mcountOngoing/`, data);
  };

  static GetMCount = (data) => {
    return axios.post(`tasks/mcount/`, data);
  };

  static GetMCountCompleted = (data) => {
    return axios.post(`tasks/mcountCompleted/`, data);
  };

  static GetByCreator = (data) => {
    return axios.get(`tasks/creator/${data._id}`, data);
  };
  static Register = (data) => {
    return axios.post(`tasks/register`, data);
  };
}

export default TaskApi;
