export const loggedIn = () => {
  const key = localStorage.getItem('token');
  return !!key;
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
