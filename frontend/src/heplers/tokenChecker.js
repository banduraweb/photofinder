import JWTDecode from 'jwt-decode';

export const loggedIn = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if (token && refreshToken) {
    const { app } = JWTDecode(token);
    return !!app;
  }
  return false;
};

export const saveToken = (token, refreshToken) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};
