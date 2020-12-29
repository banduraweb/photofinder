import api from '../api/user_db_api';

const login = (payload) => api.post('/user/login', payload);
const registration = (payload) => api.post('user/register', payload);
const getLikedList = () => api.get('/photo/likedlist');
const toggleLike = (payload) => api.post('/photo/make', payload);
const postKeyword = (payload) => api.post('/keyword/addkeyword', payload);
const getListKeyword = () => api.get('/keyword/getmykeword');

const logout = () => localStorage.removeItem('token');
const UserService = {
  login,
  logout,
  registration,
  getLikedList,
  toggleLike,
  postKeyword,
  getListKeyword,
};

export default UserService;
