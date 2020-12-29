import { handleActions } from 'redux-actions';
import * as actions from './KeywordActions';
import { combineReducers } from 'redux';
import { makeStatusWithResetReducer } from '../../heplers/reduxHelpers';

const keyWordsListInitial = [];

const keyWordsList = handleActions(
  {
    [actions.saveKeyworsList.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return keyWordsListInitial;
    },
  },
  keyWordsListInitial
);

const keyWordsListErrors = handleActions(
  {
    [actions.pushKeyworsList.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.clearAll.TRIGGER]() {
      return null;
    },
  },
  null
);

export const usersKeywords = combineReducers({
  status: makeStatusWithResetReducer(actions.pushKeyworsList, actions.clearAll),
  keyWordsList,
  errors: keyWordsListErrors,
});
