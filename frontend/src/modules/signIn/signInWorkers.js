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

function* logoutWorker() {
  yield UserService.logout();
}

function* loginWorker() {
  try {
    yield put(pushSignIn.request());

    const { input } = yield select(signInSelectors.selectLoginState);

    const { isValid, errors } = Validation.loginValidation(input);

    if (isValid) {
      const { token } = yield call(UserService.login, input);
      yield saveToken(token);
      yield put(pushSignIn.success(token));
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
