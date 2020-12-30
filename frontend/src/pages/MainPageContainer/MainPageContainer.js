import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MainPage } from './MainPage';
import { useHistory, useLocation } from 'react-router-dom';
import routing from '../../routing/routing';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../Layout/Layout';
import { pushPhoto } from '../../modules/photoPixabay/photoActions';
import { photoSelectors } from '../../modules/photoPixabay/photoSelectors';
import { REQUEST, SUCCESS } from '../../constants/constants';
import {
  pushListLikedPhotos,
  pushToggleLikePhoto,
} from '../../modules/photoActions/photoHistoryActions';
import { photoActionsSelectors } from '../../modules/photoActions/photoActionsSelectors';

export const MainPageContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { photoList, status } = useSelector(
    photoSelectors.selectFetchedPhotoFromApi
  );
  const { query } = useSelector(photoSelectors.selectActiveQuery);
  const { photoListLiked, status: likedFetchStatus } = useSelector(
    photoActionsSelectors.selectLikedPhotos
  );

  const isMyLikesPage = location.pathname === routing().liked;

  useEffect(() => {
    if (isMyLikesPage) {
      dispatch(pushListLikedPhotos());
    }
  }, [location]);

  const onScroll = () => {
    dispatch(pushPhoto(query));
  };

  const [open, setOpenCurrentIMG] = useState({ url: '', isOpen: false });

  const handleOpenCurrentImg = (url) => {
    setOpenCurrentIMG({ url: url, isOpen: true });
  };
  const handleCloseCurrentImg = () => {
    setOpenCurrentIMG({ url: '', isOpen: false });
  };

  const downloadImage = useCallback((src) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.download = 'download.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  }, []);

  const toggleLike = useCallback(
    (payload) => {
      dispatch(pushToggleLikePhoto(payload));
    },
    [dispatch]
  );

  const renderPhotoList = useMemo(() => {
    if (isMyLikesPage) {
      return photoListLiked;
    } else {
      return photoList;
    }
  }, [isMyLikesPage, photoListLiked, photoList]);
  const loading = status === REQUEST;
  const successLoaded = status === SUCCESS;
  const myLikesLoading = likedFetchStatus === REQUEST;
  const successLoadedLikes = likedFetchStatus === SUCCESS;

  return (
    <Layout>
      <MainPage
        myLikesLoading={myLikesLoading}
        successLoadedLikes={successLoadedLikes}
        query={query}
        isMyLikesPage={isMyLikesPage}
        toggleLike={toggleLike}
        downloadImage={downloadImage}
        handleOpenCurrentImg={handleOpenCurrentImg}
        handleCloseCurrentImg={handleCloseCurrentImg}
        open={open}
        onScroll={onScroll}
        photoList={renderPhotoList}
        loading={loading}
        status={status}
        successLoaded={successLoaded}
      />
    </Layout>
  );
};
