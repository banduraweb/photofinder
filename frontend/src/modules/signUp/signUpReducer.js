import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './signUpActions';
import { makeStatusWithResetReducer } from '../../heplers/reduxHelpers';

const signUpInitial = {
  name: '',
  email: '',
  password: '',
};

const signUpInput = handleActions(
  {
    [actions.saveSignUpField.TRIGGER](state, { payload }) {
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

const signUpErrors = handleActions(
  {
    [actions.pushSignUp.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.clearCurrentError.TRIGGER](state, { payload }) {
      return { ...state, [payload.name]: null };
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

export const register = combineReducers({
  status: makeStatusWithResetReducer(actions.pushSignUp, actions.clearAll),
  input: signUpInput,
  errors: signUpErrors,
});
