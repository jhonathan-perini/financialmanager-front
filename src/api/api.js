import axios from "axios";

const baseURL = 'https://financial-manager-api-o8uz.onrender.com/api/v1'

const api = axios.create({
    baseURL,
    timeout: 16000,
    withCredentials: true
})

export default api