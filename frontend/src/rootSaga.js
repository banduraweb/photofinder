import { all, fork } from 'redux-saga/effects';
import { loginWatcher } from './modules/signIn/signInWorkers';
import { signUpWatcher } from './modules/signUp/signUpWorkers';
import { photoApiWatcher } from './modules/photoPixabay/photoWorkers';
import { photoLikedWatcher } from './modules/photoActions/photoActionsWorkers';
import { keywordsWatcher } from './modules/Keywords/KeywordsWorkers';

export default function* rootSaga() {
  yield all([
    fork(loginWatcher),
    fork(signUpWatcher),
    fork(photoApiWatcher),
    fork(photoLikedWatcher),
    fork(keywordsWatcher),
  ]);
}
