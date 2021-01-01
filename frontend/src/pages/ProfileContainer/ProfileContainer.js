import React, { useCallback } from 'react';
import JWTDecode from 'jwt-decode';
import { Profile } from './Profile';
import { Layout } from '../Layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { resetPasswordSelectors } from '../../modules/resetPassword/resetPasswordSelectors';
import { REQUEST } from '../../constants/constants';
import {
  pushResetPassword,
  saveResetPasswordFields,
} from '../../modules/resetPassword/resetPasswordActions';

export const ProfileContainer = () => {
  const token = localStorage.getItem('token');
  const user = JWTDecode(token);
  const dispatch = useDispatch();
  const { input, errors, status } = useSelector(
    resetPasswordSelectors.selectResetPasswordState
  );

  const handleChange = useCallback(
    ({ target }) => {
      dispatch(saveResetPasswordFields(target));
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(pushResetPassword(input));
    },
    [dispatch, input]
  );
  const loading = status === REQUEST;

  return (
    <Layout>
      <Profile
        user={user}
        input={input}
        errors={errors}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};
