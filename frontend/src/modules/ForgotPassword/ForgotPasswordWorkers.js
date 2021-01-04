import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import UserService from '../../services/user.services';
import Notification from '../../services/notification.service';
import { forgotPasswordSelectors } from './ForgotPasswordSelectors';
import { pushForgotPassword, clearAllFields } from './ForgotPasswordActions';
import Validation from '../../services/validation.service';

function* forgotPasswordWorker() {
  try {
    yield put(pushForgotPassword.request());

    const { input } = yield select(
      forgotPasswordSelectors.selectForgotPasswordState
    );

    const { isValid, errors } = Validation.forgotPassword(input);

    if (isValid) {
      const { message } = yield call(UserService.forgotPassword, input);
      yield put(pushForgotPassword.success());
      Notification.success(message);
      yield put(clearAllFields());
    } else {
      yield put(pushForgotPassword.failure(errors));
    }
  } catch (e) {
    yield put(pushForgotPassword.failure());
    Notification.error(e?.response?.data?.error);
  }
}

export function* forgotPasswordWatcher() {
  yield all([takeLatest(pushForgotPassword.TRIGGER, forgotPasswordWorker)]);
}
