import createRequestRoutine from '../../heplers/createRequestRoutine';
import createTriggerRoutine from '../../heplers/createTriggerRoutine';

const prefix = 'RecoveryPassword';
const createRequestBound = createRequestRoutine.bind(null, prefix);
const createTriggerBound = createTriggerRoutine.bind(null, prefix);

export const pushRecoveryPassword = createRequestBound(
  'RECOVERY_PASSWORD_PUSH'
);
export const saveFieldsRecoveryPassword = createTriggerBound(
  'FORGOT_PASSWORD_SAVE'
);

export const clearAll = createTriggerBound('CLEAR_ALL');
export const clearAllFields = createTriggerBound('CLEAR_ALL_Fields');
export const clearCurrentError = createTriggerBound('CLEAR_CURRENT_ERROR');
