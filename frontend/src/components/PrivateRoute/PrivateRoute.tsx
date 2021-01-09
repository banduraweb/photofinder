import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import routing from '../../routing/routing';
import { loggedIn } from '../../heplers/tokenChecker';

interface PrivateRouteProps extends RouteProps {
  component?: any;
  children?: any;
}
const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn() ? (
        <>
          <Component {...props} {...rest} />
        </>
      ) : (
        <Redirect to={routing().login} />
      )
    }
  />
);

export default PrivateRoute;
