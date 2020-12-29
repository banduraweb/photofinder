const mode = 'develop';
const prod = mode === 'production';
export const API_USER_DB = prod ? 'https://' : 'http://localhost:3001';
export const API_PHOTO_SEARCH_API = `https://pixabay.com`;
