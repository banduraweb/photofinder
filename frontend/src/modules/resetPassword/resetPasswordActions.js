import createRequestRoutine from '../../heplers/createRequestRoutine';
import createTriggerRoutine from '../../heplers/createTriggerRoutine';

const prefix = 'resetPassword';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createTriggerBound = createTriggerRoutine.bind(null, prefix);

export const pushResetPassword = createRequestBound('RESET_PASSWORD_PUSH');
export const saveResetPasswordFields = createTriggerBound(
  'RESET_PASSWORD_FIELD_SAVE'
);

export const clearAll = createTriggerBound('CLEAR_ALL');
export const clearAllErrors = createTriggerBound('CLEAR_ALL_ERRORS');
