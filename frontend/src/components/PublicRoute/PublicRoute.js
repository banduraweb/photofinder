import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import JWTDecode from 'jwt-decode';

import routing from '../../routing/routing';

const PublicRoute = ({ component: Component, ...rest }) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    const { app } = JWTDecode(token);

    if (app) {
      return (
        <Route {...rest}>
          <Redirect to={routing().root} />
        </Route>
      );
    }
  }

  const renderComponent = (props) => <Component {...props} />;
  return <Route {...rest} render={renderComponent} />;
};

export default PublicRoute;
