import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SignUp } from './SignUp';
import { signUpSelectors } from '../../modules/signUp/signUpSelectors';
import {
  pushSignUp,
  saveSignUpField,
} from '../../modules/signUp/signUpActions';
import { REQUEST, SUCCESS } from '../../constants/constants';
import routing from '../../routing/routing';
import { clearAllErrors } from '../../modules/signUp/signUpActions';

export const SignUpContainer = () => {
  const { errors, input, status } = useSelector(
    signUpSelectors.selectSignUpState
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (status === SUCCESS) {
      history.push(routing().login);
    }
  }, [status]);

  useEffect(() => {
    dispatch(clearAllErrors());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(pushSignUp(input));
  };

  const handleLinkLogin = () => {
    history.push(routing().login);
  };

  const handleChange = ({ target }) => {
    dispatch(saveSignUpField(target));
  };

  const loading = status === REQUEST;

  return (
    <SignUp
      input={input}
      handleChange={handleChange}
      errors={errors}
      handleSubmit={handleSubmit}
      loading={loading}
      handleLinkLogin={handleLinkLogin}
    />
  );
};
