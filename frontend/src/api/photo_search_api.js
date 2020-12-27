import axios from 'axios';
import { API_PHOTO_SEARCH_API } from '../config/modeConfig';

const photo_search_api = axios.create({
  baseURL: API_PHOTO_SEARCH_API,
});

photo_search_api.interceptors.response.use((res) => res.data);

export default photo_search_api;
