import createRequestRoutine from '../../heplers/createRequestRoutine';
import createTriggerRoutine from '../../heplers/createTriggerRoutine';

const prefix = 'ForgotPassword';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createTriggerBound = createTriggerRoutine.bind(null, prefix);

export const pushForgotPassword = createRequestBound('FORGOT_PASSWORD_PUSH');
export const saveEmailForgotPassword = createTriggerBound(
  'FORGOT_PASSWORD_SAVE'
);

export const clearAll = createTriggerBound('CLEAR_ALL');
export const clearAllFields = createTriggerBound('CLEAR_ALL_Fields');
export const clearCurrentError = createTriggerBound('CLEAR_CURRENT_ERROR');
