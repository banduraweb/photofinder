import React, { useCallback } from 'react';
import { GetRecoveryLink } from './GetRecoveryLink';
import { useHistory } from 'react-router-dom';
import routing from '../../routing/routing';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordSelectors } from '../../modules/ForgotPassword/ForgotPasswordSelectors';
import {
  pushForgotPassword,
  saveEmailForgotPassword,
} from '../../modules/ForgotPassword/ForgotPasswordActions';
import { REQUEST } from '../../constants/constants';

export const GetRecoveryLinkContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { errors, input, status } = useSelector(
    forgotPasswordSelectors.selectForgotPasswordState
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(pushForgotPassword(input));
    },
    [dispatch, input]
  );

  const handleChange = useCallback(
    ({ target }) => {
      dispatch(saveEmailForgotPassword(target));
    },
    [dispatch]
  );
  const goHome = () => {
    history.push(routing().root);
  };

  const loading = status === REQUEST;

  return (
    <GetRecoveryLink
      goHome={goHome}
      errors={errors}
      input={input}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
