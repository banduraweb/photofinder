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
import { signUpSelectors } from './signUpSelectors';
import { pushSignUp, clearAllErrors, clearAll } from './signUpActions';
import Validation from '../../services/validation.service';

function* signUpWorker() {
  try {
    yield put(pushSignUp.request());

    const { input } = yield select(signUpSelectors.selectSignUpState);

    const { isValid, errors } = Validation.registrationValidation(input);

    if (isValid) {
      const { message } = yield call(UserService.registration, input);
      Notification.success(message);
      yield put(pushSignUp.success());
      yield put(clearAllErrors());
      yield put(clearAll());
    } else {
      yield put(pushSignUp.failure(errors));
    }
  } catch (e) {
    yield put(pushSignUp.failure());
    Notification.error(e?.response?.data?.error);
  }
}

export function* signUpWatcher() {
  yield all([
    takeLatest(pushSignUp.TRIGGER, signUpWorker),
    takeEvery(clearAll.TRIGGER, signUpWorker),
  ]);
}
