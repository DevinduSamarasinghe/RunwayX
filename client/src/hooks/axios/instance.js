import axios from 'axios';

const BASE_URL = 'http://localhost:8070/';

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: false
})

export default instance;