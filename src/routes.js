import React from 'react';
import { Route, Redirect, Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from '~/services/history';

import SignIn from '~/components/pages/Sign/In';
import SignUp from '~/components/pages/Sign/Up';
import Dashboard from '~/components/pages/Dashboard';
import Details from '~/components/pages/Details';
import Create from '~/components/pages/Create';
import Profile from '~/components/pages/Profile';
import Default from '~/components/layouts/Default';

export default function() {
  const signed = useSelector(state => state.signed);

  return (
    <Router history={history}>
      <Route
        path="/"
        exact
        render={props => {
          if (signed) {
            return <Redirect to="/dashboard" />;
          }
          return (
            <Default>
              <SignIn {...props} />
            </Default>
          );
        }}
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
        <Switch>
          <Route
            path="/meetups/:id/edit"
            render={props => (
              <Default>
                <Create {...props} />
              </Default>
            )}
          />
          <Route
            path="/meetups/:id"
            render={props => (
              <Default>
                <Details {...props} />
              </Default>
            )}
          />

          {[Dashboard, Create, Profile].map(Component => (
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
      )}
    </Router>
  );
}
