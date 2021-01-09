import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import JWTDecode, { JwtPayload } from 'jwt-decode';

import routing from '../../routing/routing';

interface PublicRouteProps extends RouteProps {
  component?: any;
  children?: any;
}
interface JWT extends JwtPayload {
  app: string;
}

const PublicRoute: FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  if (localStorage.getItem('token') && localStorage.getItem('refreshToken')) {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      const { app } = JWTDecode<JWT>(token);
      if (app) {
        return (
          <Route {...rest}>
            <Redirect to={routing().root} />
          </Route>
        );
      }
    }
  }

  const renderComponent = (props: PublicRouteProps) => <Component {...props} />;
  return <Route {...rest} render={renderComponent} />;
};

export default PublicRoute;
