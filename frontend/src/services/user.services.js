import api from '../api/user_db_api';

const login = (payload) => api.post('/user/login', payload);
const registration = (payload) => api.post('user/register', payload);

const logout = () => localStorage.removeItem('token');
const UserService = {
  login,
  logout,
  registration,
};

export default UserService;
