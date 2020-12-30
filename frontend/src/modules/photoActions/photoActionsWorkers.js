import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import UserService from '../../services/user.services';
import Notification from '../../services/notification.service';
import {
  pushListLikedPhotos,
  saveLikedPhotosList,
  pushToggleLikePhoto,
} from './photoHistoryActions';
import { photoSelectors } from '../photoPixabay/photoSelectors';
import { savePhotos } from '../photoPixabay/photoActions';
import { photoActionsSelectors } from './photoActionsSelectors';
import PhotoApi from "../../services/photo.api.service";

function* photoLikedWorker() {
  try {
    yield put(pushListLikedPhotos.request());
    const data = yield call(UserService.getLikedList);
    const chekedUpdatedUrlsPixabay = yield all(data.map((img) => call(PhotoApi.getPhotoById, img.photoId)));
    const formatedData = chekedUpdatedUrlsPixabay.map(({hits})=>({
      ...hits[0],
       photoId: hits[0].id
    }));

    yield put(saveLikedPhotosList(formatedData));
    yield put(pushListLikedPhotos.success());
  } catch (e) {
    yield put(pushListLikedPhotos.failure());
    Notification.error(e?.response?.data?.error || 'Something went wrong...');
  }
}

function* photoToglerLikerWorker({ payload }) {
  try {
    const { photoList } = yield select(
      photoSelectors.selectFetchedPhotoFromApi
    );
    const { photoListLiked } = yield select(
      photoActionsSelectors.selectLikedPhotos
    );

    yield put(pushToggleLikePhoto.request());
    yield call(UserService.toggleLike, payload);
    const formatedData = photoList.map((img) => {
      if (img.id == payload.photoId) {
        return {
          ...img,
          liked: !img.liked,
        };
      }
      return img;
    });
    const filteredByDislike = photoListLiked.filter(
      (img) => img.photoId != payload.photoId
    );

    yield put(saveLikedPhotosList(filteredByDislike));
    yield put(savePhotos(formatedData));
    yield put(pushListLikedPhotos.success());
  } catch (e) {
    yield put(pushListLikedPhotos.failure());
    Notification.error(e?.response?.data?.error || 'Something went wrong...');
  }
}

export function* photoLikedWatcher() {
  yield all([
    takeLatest(pushListLikedPhotos.TRIGGER, photoLikedWorker),
    takeLatest(pushToggleLikePhoto.TRIGGER, photoToglerLikerWorker),
  ]);
}
