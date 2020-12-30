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
}) => {
  return (
    <GridListBar
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
