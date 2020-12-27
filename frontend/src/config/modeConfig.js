const mode = 'develop';
const prod = mode === 'production';
const pixabayKey = '11370902-19d6d747d66b3dd76f6049b2b';
export const API_USER_DB = prod ? 'https://' : 'http://localhost:3001';
export const API_PHOTO_SEARCH_API = prod
  ? `https://pixabay.com/api?key=${pixabayKey}&q=`
  : `https://pixabay.com/api?key=${pixabayKey}&q=`;
