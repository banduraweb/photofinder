import api from '../api/photo_search_api';
const pixabayKey = '11370902-19d6d747d66b3dd76f6049b2b';
// const pixabayKey = '19655068-dbf36f63b12fc795bd3b7002e';

const get = (payload) =>
  api.get(
    `/api/?key=${pixabayKey}&q=${payload.keyword}&image_type=photo&per_page=12&page=${payload.pageNumber}`
  );

const getPhotoById = (id) =>
  api.get(
    `/api/?key=19655068-dbf36f63b12fc795bd3b7002e&id=${id}`
  );

const PhotoApi = {
  get,
  getPhotoById
};

export default PhotoApi;
