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
    console.log(`data:${data},id:${_id}`);
    return axios.put(`tasks/task/${_id}`, data);
  };

  static GetCountByCreator = (data) => {
    return axios.get(`tasks/countByCreator/`, data);
  };

  static GetCountCompleted = () => {
    return axios.get(`tasks/countCompleted/`);
  };

  static GetCountOngoing = () => {
    return axios.get(`tasks/countOngoing/`);
  };

  static GetByCreator = (data) => {
    return axios.get(`tasks/creator/${data._id}`, data);
  };
  static Register = (data) => {
    return axios.post(`tasks/register`, data);
  };
}

export default TaskApi;
