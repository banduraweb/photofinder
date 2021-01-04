import { all, fork } from 'redux-saga/effects';
import { loginWatcher } from './modules/signIn/signInWorkers';
import { signUpWatcher } from './modules/signUp/signUpWorkers';
import { photoApiWatcher } from './modules/photoPixabay/photoWorkers';
import { photoLikedWatcher } from './modules/photoActions/photoActionsWorkers';
import { keywordsWatcher } from './modules/Keywords/KeywordsWorkers';
import { resetPasswordWatcher } from './modules/resetPassword/resetPasswordWorkers';
import { forgotPasswordWatcher } from './modules/ForgotPassword/ForgotPasswordWorkers';
import { recoveryPasswordWatcher } from './modules/RecoveryPassword/RecoveryPasswordWorkers';

export default function* rootSaga() {
  yield all([
    fork(loginWatcher),
    fork(signUpWatcher),
    fork(photoApiWatcher),
    fork(photoLikedWatcher),
    fork(keywordsWatcher),
    fork(resetPasswordWatcher),
    fork(forgotPasswordWatcher),
    fork(recoveryPasswordWatcher),
  ]);
}
