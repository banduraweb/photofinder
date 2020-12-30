import React from 'react';
import { GridListBar } from '../../components/GridList/GridList';

export const MainPage = ({
  onScroll,
  pageNumber,
  photoList,
  loading,
  successLoaded,
  handleOpenCurrentImg,
  handleCloseCurrentImg,
  open,
  downloadImage,
  toggleLike,
  isMyLikesPage,
  query,
  myLikesLoading,
  successLoadedLikes,
}) => {
  return (
    <GridListBar
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
      pageNumber={pageNumber}
      photoList={photoList}
      loading={loading}
      successLoaded={successLoaded}
    />
  );
};
