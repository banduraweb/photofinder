import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import routing from './routing/routing';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import { NotFoundContainer } from './pages/NotFound/NotFoundContainer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SignInContainer } from './pages/SignInContainer/SignInContainer';
import { MainPageContainer } from './pages/MainPageContainer/MainPageContainer';
import { SignUpContainer } from './pages/SignUpContainer/SignUpContainer';
import { ProfileContainer } from './pages/ProfileContainer/ProfileContainer';
import { KeywordsContainer } from './pages/KeywordsContainer/KeywordsContainer';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Switch>
        {/* PUBLIC PAGES */}
        <PublicRoute exact path={routing().login} component={SignInContainer} />
        <PublicRoute
          exact
          path={routing().register}
          component={SignUpContainer}
        />
        <Route exact path={routing().notFound} component={NotFoundContainer} />

        {/* PROTECTED PAGES */}
        <PrivateRoute
          exact
          path={routing().root}
          component={MainPageContainer}
        />
        <PrivateRoute
          exact
          path={routing().liked}
          component={MainPageContainer}
        />
        <PrivateRoute
          exact
          path={routing().profile}
          component={ProfileContainer}
        />
        <PrivateRoute
          exact
          path={routing().keywords}
          component={KeywordsContainer}
        />

        {/* NOT FOUND */}
        <Route exact path="*">
          <Redirect to={routing().notFound} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
