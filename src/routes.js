import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Edit from '~/components/pages/Edit';
import Dashboard from '~/components/pages/Dashboard';
import Default from '~/components/layouts/Default';
import Details from '~/components/pages/Details';
import Profile from '~/components/pages/Profile';
import SignIn from '~/components/pages/Sign/In';
import SignUp from '~/components/pages/Sign/Up';
import history from '~/services/history';

export default () => {
  const signed = useSelector(state => state.signed);

  return (
    <Router history={history}>
      <Route
        exact
        path="/"
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
        exact
        path="/signup"
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
                <Edit {...props} />
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

          {[Dashboard, Edit, Profile].map(Component => (
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
};
