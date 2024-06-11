import axios from 'axios';

const api = axios.create({
  baseURL: `https://jsonplaceholder.typicode.com/`,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error(error);
    return Promise.reject(err);
  },
);
export default api;
//Akash
