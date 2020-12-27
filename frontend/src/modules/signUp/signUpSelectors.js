const selectStatus = (state) => state.register.status;
const selectInputFields = (state) => state.register.input;
const selectErrors = (state) => state.register.errors;
const selectSignUpState = (state) => state.register;

export const signUpSelectors = {
  selectStatus,
  selectInputFields,
  selectErrors,
  selectSignUpState,
};
