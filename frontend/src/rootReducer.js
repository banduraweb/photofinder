import { combineReducers } from 'redux';
import { login } from './modules/signIn/signInReducer';
import { pushLogout } from './modules/signIn/signInActions';
import { register } from './modules/signUp/signUpReducer';
import { photoApi } from './modules/photoPixabay/photoReducer';
import { photoActions } from './modules/photoActions/photoActionsReducer';
import { usersKeywords } from './modules/Keywords/KeywordsReducers';
import { resetPassword } from './modules/resetPassword/resetPasswordReducer';
import { forgotPassword } from './modules/ForgotPassword/ForgotPasswordReducer';
import { recoveryPassword } from './modules/RecoveryPassword/RecoveryPasswordReducer';

/* Unite all reducers */
const rootReducer = combineReducers({
  login,
  register,
  photoApi,
  photoActions,
  usersKeywords,
  resetPassword,
  forgotPassword,
  recoveryPassword,
});

export default (state, action) => {
  if (action.type === pushLogout.TRIGGER) {
    state = undefined;
  }

  return rootReducer(state, action);
};
