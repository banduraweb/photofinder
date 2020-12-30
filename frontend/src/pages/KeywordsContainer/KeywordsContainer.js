import React, { useEffect, useState, useMemo } from 'react';
import { compareAsc } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { Keywords } from './Keywords';
import { Layout } from '../Layout/Layout';
import { pushKeyworsList } from '../../modules/Keywords/KeywordActions';
import { keyWordsSelectors } from '../../modules/Keywords/KeywordsSelectors';
import { selectOpt } from '../../constants/constants';

export const KeywordsContainer = () => {
  const dispatch = useDispatch();
  const { status, keyWordsList } = useSelector(
    keyWordsSelectors.selectUsersKeywords
  );
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    dispatch(pushKeyworsList());
  }, []);

  const sortedKeywords = useMemo(() => {
    switch (selected) {
      case 1:
        return keyWordsList.sort((a, b) =>
          compareAsc(new Date(a.updatedAt), new Date(b.updatedAt))
        );
      case 2:
        return keyWordsList.sort((a, b) =>
          compareAsc(new Date(b.updatedAt), new Date(a.updatedAt))
        );
      case 3:
        return keyWordsList.sort((a, b) => a.keyword.localeCompare(b.keyword));
      case 4:
        return keyWordsList.sort((a, b) => b.keyword.localeCompare(a.keyword));
      case 5:
        return keyWordsList.sort((a, b) => b.usedTimes - a.usedTimes);
      case 6:
        return keyWordsList.sort((a, b) => a.usedTimes - b.usedTimes);
      default:
        return keyWordsList;
    }
  }, [selected, keyWordsList, status]);

  return (
    <Layout>
      <Keywords
        status={status}
        keyWordsList={sortedKeywords}
        setSelected={setSelected}
        selected={selected}
        selectOpt={selectOpt}
      />
    </Layout>
  );
};
