import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://notebox-api.onrender.com/api/user',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default instance;
