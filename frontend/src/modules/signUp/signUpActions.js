import createRequestRoutine from '../../heplers/createRequestRoutine';
import createTriggerRoutine from '../../heplers/createTriggerRoutine';

const prefix = 'signUp';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createTriggerBound = createTriggerRoutine.bind(null, prefix);

export const pushSignUp = createRequestBound('SIGNIN_PUSH');
export const saveSignUpField = createTriggerBound('SIGNIN_FIELD_SAVE');

export const clearAll = createTriggerBound('CLEAR_ALL');
export const clearAllErrors = createTriggerBound('CLEAR_ALL_ERRORS');
export const clearCurrentError = createTriggerBound('CLEAR_CURRENT_ERROR');
