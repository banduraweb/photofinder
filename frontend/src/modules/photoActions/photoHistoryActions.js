import createRequestRoutine from '../../heplers/createRequestRoutine';
import createTriggerRoutine from '../../heplers/createTriggerRoutine';

const prefix = 'photoActions';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createTriggerBound = createTriggerRoutine.bind(null, prefix);

export const pushListLikedPhotos = createRequestBound('PHOTO_PUSH_LIST');
export const saveLikedPhotosList = createTriggerBound('UPDATE_PHOTOS_LIKED');

export const pushToggleLikePhoto = createRequestBound('TOGGLE_PHOTO_PUSH');

export const clearAll = createTriggerBound('CLEAR_ALL');
