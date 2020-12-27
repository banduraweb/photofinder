import { all, fork } from 'redux-saga/effects';
import { loginWatcher } from './modules/signIn/signInWorkers';
import { signUpWatcher } from './modules/signUp/signUpWorkers';

export default function* rootSaga() {
  yield all([fork(loginWatcher), fork(signUpWatcher)]);
}
