import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Dashboard from './components/pages/Dashboard';
import Details from './components/pages/Details';
import Create from './components/pages/Create';
import Profile from './components/pages/Profile';
import Default from './components/layouts/Default';

export default function() {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <Default>
              <SignIn {...props} />
            </Default>
          )}
        />

        {[SignUp, Dashboard, Details, Create, Profile].map(Component => (
          <Route
            key={Component.name}
            path={`/${Component.name.toLowerCase()}`}
            render={props => (
              <Default>
                <Component {...props} />
              </Default>
            )}
          />
        ))}
      </Switch>
    </Router>
  );
}
