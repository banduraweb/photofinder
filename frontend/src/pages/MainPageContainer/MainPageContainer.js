import React from 'react';
import { MainPage } from './MainPage';
import { useHistory } from 'react-router-dom';
import routing from '../../routing/routing';
import { useDispatch, useSelector } from 'react-redux';
import { pushLogout } from '../../modules/signIn/signInActions';

export const MainPageContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    dispatch(pushLogout());
    history.push(routing().login);
  };
  return <MainPage logout={logout} />;
};
