import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Keywords } from './Keywords';
import { Layout } from '../Layout/Layout';
import { pushKeyworsList } from '../../modules/Keywords/KeywordActions';
import { keyWordsSelectors } from '../../modules/Keywords/KeywordsSelectors';

export const KeywordsContainer = () => {
  const dispatch = useDispatch();
  const { status, keyWordsList } = useSelector(
    keyWordsSelectors.selectUsersKeywords
  );

  useEffect(() => {
    dispatch(pushKeyworsList());
  }, []);
  return (
    <Layout>
      <Keywords keyWordsList={keyWordsList} />
    </Layout>
  );
};
