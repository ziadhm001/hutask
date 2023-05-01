import Axios from "axios"
import { API_SERVER } from "../config/constant"

const axiosR = Axios.create({
    baseURL: `${API_SERVER}`,
    headers: { "Content-Type": "multipart/form-data" },
})

// Add a request interceptor
axiosR.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
        let token = user.token
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

axiosR.interceptors.request.use(
    (config) => {
        return Promise.resolve(config)
    },
    (error) => Promise.reject(error)
)

axiosR.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosR
