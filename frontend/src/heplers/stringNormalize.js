export const queryNormalize = (inputValue) => {
  return inputValue.replace(/[0-9]|[!@#$%^&*()_+]/g, '');
};
