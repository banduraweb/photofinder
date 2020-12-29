import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './photoHistoryActions';
import { makeStatusWithResetReducer } from '../../heplers/reduxHelpers';

// photo list liked
const photoListLikedInitial = [];

const photoListLiked = handleActions(
  {
    [actions.saveLikedPhotosList.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return photoListLikedInitial;
    },
  },
  photoListLikedInitial
);

const photoLikedListErrors = handleActions(
  {
    [actions.pushListLikedPhotos.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return null;
    },
  },
  null
);

const usersPhotoListLiked = combineReducers({
  status: makeStatusWithResetReducer(
    actions.pushListLikedPhotos,
    actions.clearAll
  ),
  photoListLiked,
  errors: photoLikedListErrors,
});

// unit reducers
export const photoActions = combineReducers({
  usersPhotoListLiked,
});
