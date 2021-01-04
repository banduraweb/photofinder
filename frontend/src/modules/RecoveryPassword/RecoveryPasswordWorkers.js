import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import UserService from '../../services/user.services';
import Notification from '../../services/notification.service';
import { recoveryPasswordSelectors } from './RecoveryPasswordSelectors';
import {
  pushRecoveryPassword,
  clearAllFields,
} from './RecoveryPasswordActions';
import Validation from '../../services/validation.service';

function* recoveryPasswordWorker({ payload }) {
  try {
    yield put(pushRecoveryPassword.request());

    const { input } = yield select(
      recoveryPasswordSelectors.selectRecoveryState
    );

    const { isValid, errors } = Validation.recoveryPasswordValidation(input);
    if (isValid) {
      const { message } = yield call(UserService.recoveryPassword, {
        ...input,
        ...payload,
      });
      yield put(pushRecoveryPassword.success());
      Notification.success(message);
      yield put(clearAllFields());
    } else {
      yield put(pushRecoveryPassword.failure(errors));
    }
  } catch (e) {
    yield put(
      pushRecoveryPassword.failure({ serverError: e?.response?.data.error })
    );
    Notification.error(e?.response?.data?.error);
  }
}

export function* recoveryPasswordWatcher() {
  yield all([takeLatest(pushRecoveryPassword.TRIGGER, recoveryPasswordWorker)]);
}
