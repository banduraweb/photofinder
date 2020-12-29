import createRequestRoutine from '../../heplers/createRequestRoutine';
import createTriggerRoutine from '../../heplers/createTriggerRoutine';

const prefix = 'photoPixabay';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createTriggerBound = createTriggerRoutine.bind(null, prefix);

export const pushPhoto = createRequestBound('PHOTO_PUSH');
export const savePhotos = createTriggerBound('PHOTOS_SAVE');
export const resetPhotoList = createRequestBound('PHOTO_LIST_RESET');
export const clearAll = createTriggerBound('CLEAR_ALL');

export const setCountPage = createTriggerBound('PAGE_COUNT');
export const resetCountPage = createTriggerBound('PAGE_COUNT_RESET');

export const saveQuerySearch = createTriggerBound('PHOTO_QUERY_SAVE');
export const resetQuery = createTriggerBound('PHOTO_QUERY_RESET');
