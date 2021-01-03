import JWTDecode from 'jwt-decode';

export const loggedIn = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { app } = JWTDecode(token);
    return !!app;
  }
  return false;
};

export const saveToken = (token, refreshToken) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};
