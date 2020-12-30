import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import PhotoApi from '../../services/photo.api.service';
import UserService from '../../services/user.services';
import Notification from '../../services/notification.service';
import { photoSelectors } from './photoSelectors';
import { pushPhoto, setCountPage, savePhotos } from './photoActions';
import { photoActionsSelectors } from '../photoActions/photoActionsSelectors';
import {pushListLikedPhotos} from "../photoActions/photoHistoryActions";

function* photoApiWorker({ payload }) {
  try {
    const pageNumber = yield select(photoSelectors.selectPageForFetching);
    if (pageNumber === 1) {
      yield put(pushListLikedPhotos());
    }

    const { photoList } = yield select(
      photoSelectors.selectFetchedPhotoFromApi
    );
    yield put(pushPhoto.request());
    const { hits } = yield call(PhotoApi.get, { keyword: payload, pageNumber });
    if (pageNumber === 1) {
      yield call(UserService.postKeyword, { keyword: payload });
    }

    const { photoListLiked: currentLiked } = yield select(
      photoActionsSelectors.selectLikedPhotos
    );
    const formatedData = hits.map((img) => {
      const liked = currentLiked.find((liked) => liked.photoId == img.id);
      if (liked) {
        return {
          ...img,
          liked: true,
        };
      }
      return {
        ...img,
        liked: false,
      };
    });
    yield put(savePhotos([...photoList, ...formatedData]));
    yield put(pushPhoto.success());
    yield put(setCountPage());
  } catch (e) {
    yield put(pushPhoto.failure());
    Notification.error(e?.response?.data?.error || 'Something went wrong...');
  }
}

export function* photoApiWatcher() {
  yield all([takeLatest(pushPhoto.TRIGGER, photoApiWorker)]);
}
