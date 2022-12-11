import axios from "axios";

const baseURL = 'http://localhost:8000/api/v1'

const api = axios.create({
    baseURL,
    timeout: 16000,
    withCredentials: true
})

export default api