import createRequestRoutine from '../../heplers/createRequestRoutine';
import createTriggerRoutine from '../../heplers/createTriggerRoutine';

const prefix = 'keyWords';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createTriggerBound = createTriggerRoutine.bind(null, prefix);

export const pushKeyworsList = createRequestBound('PHOTO_PUSH');
export const saveKeyworsList = createTriggerBound('PHOTOS_SAVE');
export const clearAll = createTriggerBound('CLEAR_ALL');
