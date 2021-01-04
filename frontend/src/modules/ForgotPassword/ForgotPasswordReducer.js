import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './ForgotPasswordActions';
import { makeStatusWithResetReducer } from '../../heplers/reduxHelpers';

const forgotPasswordInitial = {
  email: '',
};

const forgotPasswordInput = handleActions(
  {
    [actions.saveEmailForgotPassword.TRIGGER](state, { payload }) {
      return { ...state, [payload.name]: payload.value };
    },
    [actions.clearAllFields.TRIGGER]() {
      return forgotPasswordInitial;
    },
    [actions.clearAll.TRIGGER]() {
      return forgotPasswordInitial;
    },
  },
  forgotPasswordInitial
);

const forgotPasswordErrors = handleActions(
  {
    [actions.pushForgotPassword.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.clearCurrentError.TRIGGER](state, { payload }) {
      return { ...state, [payload.name]: null };
    },
    [actions.clearAllFields.TRIGGER]() {
      return {};
    },
    [actions.clearAll.TRIGGER]() {
      return {};
    },
  },
  {}
);

export const forgotPassword = combineReducers({
  status: makeStatusWithResetReducer(
    actions.pushForgotPassword,
    actions.clearAll
  ),
  input: forgotPasswordInput,
  errors: forgotPasswordErrors,
});
