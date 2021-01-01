export const inputErrorsNormalize = (str = '') => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
};
