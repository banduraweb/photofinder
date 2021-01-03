/* eslint-disable */
import axios from 'axios';
import { API_USER_DB } from '../config/modeConfig';
import JWTDecode from 'jwt-decode';

const user_db_api = axios.create({
  baseURL: API_USER_DB,
});

user_db_api.interceptors.request.use(
  async (reqConfig) => {
    const token = localStorage.getItem('token');
    let newToken = null;

    if (token) {
      const { exp } = JWTDecode(token);
      const expired = exp < (new Date().getTime() + 1) / 1000;
      if (expired) {
        const refreshToken = localStorage.getItem('refreshToken');
        await axios
          .post(`${API_USER_DB}user/refreshtoken`, {
            refreshToken: refreshToken,
          })
          .then(async (res) => {
            if (res.status === 200) {
              await localStorage.setItem('token', res.data.token);
              newToken = res.data.token;
            }
          });
      }
      reqConfig.headers.Authorization = `Bearer ${expired ? newToken : token}`;
    }

    return reqConfig;
  },
  (err) => Promise.reject(err)
);

user_db_api.interceptors.response.use((res) => res.data);

export default user_db_api;
