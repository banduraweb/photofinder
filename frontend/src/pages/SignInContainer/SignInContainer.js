import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SignIn } from './SignIn';
import { signInSelectors } from '../../modules/signIn/signInSelectors';
import {
  pushSignIn,
  saveSignInField,
} from '../../modules/signIn/signInActions';
import { REQUEST, SUCCESS } from '../../constants/constants';
import routing from '../../routing/routing';
import { clearAllErrors } from '../../modules/signIn/signInActions';

export const SignInContainer = () => {
  const { errors, input, status } = useSelector(
    signInSelectors.selectLoginState
  );
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (status === SUCCESS) {
      history.push(routing().root);
    }
  }, [status]);

  useEffect(() => {
    dispatch(clearAllErrors());
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(pushSignIn(input));
    },
    [dispatch, input]
  );

  const handleChange = useCallback(
    ({ target }) => {
      dispatch(saveSignInField(target));
    },
    [dispatch]
  );

  const handleLinkRegistration = useCallback(() => {
    history.push(routing().register);
  }, [history]);

  const handleLinkForgotPassword = useCallback(() => {
    history.push(routing().forgotpassword);
  }, [history]);

  const loading = status === REQUEST;

  return (
    <SignIn
      input={input}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={errors}
      loading={loading}
      handleLinkRegistration={handleLinkRegistration}
      handleLinkForgotPassword={handleLinkForgotPassword}
    />
  );
};
