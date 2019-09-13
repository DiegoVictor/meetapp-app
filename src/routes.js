import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SignIn from './components/pages/Sign/In';
import SignUp from './components/pages/Sign/Up';
import Dashboard from './components/pages/Dashboard';
import Details from './components/pages/Details';
import Create from './components/pages/Create';
import Profile from './components/pages/Profile';
import Default from './components/layouts/Default';

export default function() {
  const signed = useSelector(state => state.signed);

  return (
    <BrowserRouter>
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

        <Route
          path="/signup"
          exact
          render={props => (
            <Default>
              <SignUp {...props} />
            </Default>
          )}
        />

        {!signed ? (
          <Redirect to="/" />
        ) : (
          [Dashboard, Details, Create, Profile].map(Component => (
            <Route
              key={Component.name}
              path={`/${Component.name.toLowerCase()}`}
              render={props => (
                <Default>
                  <Component {...props} />
                </Default>
              )}
            />
          ))
        )}
      </Switch>
    </BrowserRouter>
  );
}
