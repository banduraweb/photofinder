import React, { useEffect } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(pushSignIn(input));
  };

  const handleChange = ({ target }) => {
    dispatch(saveSignInField(target));
  };

  const handleLinkRegistration = () => {
    history.push(routing().register);
  };

  const loading = status === REQUEST;

  return (
    <SignIn
      input={input}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={errors}
      loading={loading}
      handleLinkRegistration={handleLinkRegistration}
    />
  );
};
