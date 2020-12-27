import axios from 'axios';
import { API_USER_DB } from '../config/modeConfig';

const user_db_api = axios.create({
  baseURL: API_USER_DB,
});

user_db_api.interceptors.request.use(
  (reqConfig) => {
    if (localStorage.getItem('token'))
      reqConfig.headers.Authorization =
        'Bearer ' + localStorage.getItem('token');

    return reqConfig;
  },
  (err) => Promise.reject(err)
);

user_db_api.interceptors.response.use((res) => res.data);

export default user_db_api;
