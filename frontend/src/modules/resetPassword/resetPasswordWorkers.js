import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import UserService from '../../services/user.services';
import Notification from '../../services/notification.service';
import { resetPasswordSelectors } from './resetPasswordSelectors';
import { pushResetPassword, clearAllErrors } from './resetPasswordActions';
import Validation from '../../services/validation.service';

function* resetPasswordWorker() {
  try {
    yield put(pushResetPassword.request());

    const { input } = yield select(
      resetPasswordSelectors.selectResetPasswordState
    );

    const { isValid, errors } = Validation.resetPasswordValidation(input);

    if (isValid) {
      const { message } = yield call(UserService.resetPassword, input);

      Notification.success(message);
      yield put(pushResetPassword.success());
      yield put(clearAllErrors());
    } else {
      yield put(pushResetPassword.failure(errors));
    }
  } catch (e) {
    yield put(pushResetPassword.failure());
    Notification.error(e?.response?.data?.error);
  }
}

export function* resetPasswordWatcher() {
  yield all([takeLatest(pushResetPassword.TRIGGER, resetPasswordWorker)]);
}
