import JWTDecode from 'jwt-decode';

export const loggedIn = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { app } = JWTDecode(token);
    return !!app;
  }
  return false;
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};
