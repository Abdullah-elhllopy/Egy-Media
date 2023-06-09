import axios from 'axios';
const serializedState = localStorage.getItem('persist:root');
const state = JSON.parse(serializedState);
console.log(state.token)

const API = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 5000,
    headers: {
        // 'Content-Type': '*/*',
        'Authorization': `Bearer ${state.token.replace(/"/g, '')}`,
        'Content-type': 'application/json',
        Accept: '*/*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": 'http://localhost:3001/',
    },
});
export const APISUBMIT = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 5000,
    headers: {
        // 'Content-Type': '*/*',
        'Authorization': `Bearer ${state.token.replace(/"/g, '')}`,
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": 'http://localhost:3001/',
    },
});

API.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {

            console.log('Unauthorized Request!');

        }
        return Promise.reject(error.response.data || error);
    }
);

export default API;