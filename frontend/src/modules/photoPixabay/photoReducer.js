import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './photoActions';
import { makeStatusWithResetReducer } from '../../heplers/reduxHelpers';

// photo list pixabay
const photoListInitial = [];

const photoList = handleActions(
  {
    [actions.savePhotos.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return photoListInitial;
    },
    [actions.resetPhotoList.TRIGGER]() {
      return photoListInitial;
    },
  },
  photoListInitial
);

const photoErrors = handleActions(
  {
    [actions.pushPhoto.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return null;
    },
  },
  null
);

const photo = combineReducers({
  status: makeStatusWithResetReducer(actions.pushPhoto, actions.clearAll),
  photoList,
  errors: photoErrors,
});

// increment/reset page number

const counterInitial = 1;

const counter = handleActions(
  {
    [actions.setCountPage.TRIGGER](state, { payload }) {
      return state + 1;
    },
    [actions.resetCountPage.TRIGGER]() {
      return counterInitial;
    },
  },
  counterInitial
);

const activePageNumber = combineReducers({
  counter,
});

// save query search

const queryInitial = {
  query: '',
};

const query = handleActions(
  {
    [actions.saveQuerySearch.TRIGGER](state, { payload }) {
      return { ...state, [payload.name]: payload.value };
    },
    [actions.resetQuery.TRIGGER]() {
      return queryInitial;
    },
  },
  queryInitial
);

const activeQuery = combineReducers({
  query,
});

// unit reducers
export const photoApi = combineReducers({
  activePageNumber,
  photo,
  activeQuery,
});
