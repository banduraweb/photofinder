import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import UserService from '../../services/user.services';
import Notification from '../../services/notification.service';
import { signInSelectors } from './signInSelectors';
import {
  pushLogout,
  pushSignIn,
  clearAllErrors,
  clearAll,
} from './signInActions';
import { saveToken } from '../../heplers/tokenChecker';
import Validation from '../../services/validation.service';
import routing from '../../routing/routing';

function* logoutWorker({ payload }) {
  try {
    const { message } = yield call(UserService.logout, payload);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = routing().root;
    Notification.success(message);
  } catch (e) {
    console.log(e);
    Notification.error(e?.response?.data?.error || 'Error logout, try again!');
  }
}

function* loginWorker() {
  try {
    yield put(pushSignIn.request());

    const { input } = yield select(signInSelectors.selectLoginState);

    const { isValid, errors } = Validation.loginValidation(input);

    if (isValid) {
      const { token, refreshToken } = yield call(UserService.login, input);
      yield saveToken(token, refreshToken);
      yield put(pushSignIn.success());
      yield put(clearAllErrors());
      yield put(clearAll());
    } else {
      yield put(pushSignIn.failure(errors));
    }
  } catch (e) {
    yield put(pushSignIn.failure());
    Notification.error(e?.response?.data?.error);
  }
}

export function* loginWatcher() {
  yield all([
    takeLatest(pushSignIn.TRIGGER, loginWorker),
    takeLatest(pushLogout, logoutWorker),
    takeEvery(clearAll.TRIGGER, loginWorker),
  ]);
}
