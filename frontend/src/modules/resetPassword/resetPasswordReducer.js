import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './resetPasswordActions';
import { makeStatusWithResetReducer } from '../../heplers/reduxHelpers';

const signUpInitial = {
  oldPassword: '',
  newPassword: '',
  confirmedNewPassword: '',
};

const resetPasswordInput = handleActions(
  {
    [actions.saveResetPasswordFields.TRIGGER](state, { payload }) {
      return { ...state, [payload.name]: payload.value };
    },
    [actions.clearAllErrors.TRIGGER]() {
      return signUpInitial;
    },
    [actions.clearAll.TRIGGER]() {
      return signUpInitial;
    },
  },
  signUpInitial
);

const pushResetPasswordErrors = handleActions(
  {
    [actions.pushResetPassword.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.clearAllErrors.TRIGGER]() {
      return {};
    },
    [actions.clearAll.TRIGGER]() {
      return {};
    },
  },
  {}
);

export const resetPassword = combineReducers({
  status: makeStatusWithResetReducer(
    actions.pushResetPassword,
    actions.clearAll
  ),
  input: resetPasswordInput,
  errors: pushResetPasswordErrors,
});
