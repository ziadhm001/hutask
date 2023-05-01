import axios from "./index"
class UserApi {
    static Register = (data) => {
        return axios.post(`users/register/`, data)
    }

    static Get = (data) => {
        return axios.get(`users/`)
    }

    static GetUnassigned = () => {
        return axios.get(`users/unassigned/`)
    }

    static GetUnassignedManager = (data) => {
        return axios.post(`users/unassignedmanager/`, data)
    }

    static GetUsersManager = (data) => {
        return axios.post(`users/manager/`, data)
    }

    static GetByRole = (data) => {
        return axios.get(`users/role/${data}`)
    }

    static GetRole = (data) => {
        return axios.get(`users/user/role/${data}`)
    }

    static GetDepartment = (data) => {
        return axios.get(`users/user/department/${data}`)
    }

    static GetCreatedCount = () => {
        return axios.get(`users/countCreatedTasks/`)
    }

    static GetUnassignedCount = () => {
        return axios.get(`users/countUnassigned/`)
    }

    static GetManager = (data) => {
        return axios.post(`users/manager`, data)
    }

    static GetMUnassignedCount = (data) => {
        return axios.post(`users/mcountUnassigned/`, data)
    }

    static AssignTask = (data) => {
        return axios.post(`users/assign/`, data)
    }

    static UnAssignTask = (data) => {
        return axios.post(`users/unassign/`, data)
    }
}

export default UserApi
