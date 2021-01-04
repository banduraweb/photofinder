import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './RecoveryPasswordActions';
import { makeStatusWithResetReducer } from '../../heplers/reduxHelpers';

const recoveryPasswordInitial = {
  newPassword: '',
  confirmedNewPassword: '',
};

const recoveryPasswordInput = handleActions(
  {
    [actions.saveFieldsRecoveryPassword.TRIGGER](state, { payload }) {
      return { ...state, [payload.name]: payload.value };
    },
    [actions.clearAllFields.TRIGGER]() {
      return recoveryPasswordInitial;
    },
    [actions.clearAll.TRIGGER]() {
      return recoveryPasswordInitial;
    },
  },
  recoveryPasswordInitial
);

const recoveryPasswordErrors = handleActions(
  {
    [actions.pushRecoveryPassword.FAILURE](state, { payload }) {
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

export const recoveryPassword = combineReducers({
  status: makeStatusWithResetReducer(
    actions.pushRecoveryPassword,
    actions.clearAll
  ),
  input: recoveryPasswordInput,
  errors: recoveryPasswordErrors,
});
