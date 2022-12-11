import axios from "axios";

const baseURL = 'https://financial-manager.onrender.com/api/v1'

const api = axios.create({
    baseURL,
    timeout: 16000,
    withCredentials: true
})

export default api