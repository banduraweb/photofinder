import { combineReducers } from 'redux';
import { login } from './modules/signIn/signInReducer';
import { pushLogout } from './modules/signIn/signInActions';
import { register } from './modules/signUp/signUpReducer';

/* Unite all reducers */
const rootReducer = combineReducers({
  login,
  register,
});

export default (state, action) => {
  if (action.type === pushLogout.TRIGGER) {
    state = undefined;
  }

  return rootReducer(state, action);
};
