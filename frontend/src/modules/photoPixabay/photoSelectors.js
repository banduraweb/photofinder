const selectFetchedPhotoFromApi = (state) => state.photoApi.photo;
const selectPageForFetching = (state) =>
  state.photoApi.activePageNumber.counter;
const selectActiveQuery = (state) => state.photoApi.activeQuery.query;

export const photoSelectors = {
  selectFetchedPhotoFromApi,
  selectPageForFetching,
  selectActiveQuery,
};
