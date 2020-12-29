import { all, call, put, takeLatest } from 'redux-saga/effects';
import UserService from '../../services/user.services';
import Notification from '../../services/notification.service';
import { pushKeyworsList, saveKeyworsList } from './KeywordActions';

function* keywordsWorker() {
  try {
    yield put(pushKeyworsList.request());
    const data = yield call(UserService.getListKeyword);
    yield put(saveKeyworsList(data));
    yield put(pushKeyworsList.success());
  } catch (e) {
    yield put(pushKeyworsList.failure());
    Notification.error(e?.response?.data?.error || 'Something went wrong...');
  }
}

export function* keywordsWatcher() {
  yield all([takeLatest(pushKeyworsList.TRIGGER, keywordsWorker)]);
}
