import axios from 'axios'

const BASE_URL = 'http://localhost:8084/';

const userInstance = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: false
})

export default userInstance;