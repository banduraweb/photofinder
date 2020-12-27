import React from 'react';
import { NotFound } from './NotFound';
import { useHistory } from 'react-router-dom';
import routing from '../../routing/routing';

export const NotFoundContainer = () => {
  const history = useHistory();
  const goHome = () => {
    history.push(routing().root);
  };
  return <NotFound goHome={goHome} />;
};
