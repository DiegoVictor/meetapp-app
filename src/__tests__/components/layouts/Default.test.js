import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import faker from 'faker';

import Default from '~/components/layouts/Default';
import history from '~/services/history';
import { signOut } from '~/store/actions/user';

jest.mock('react-redux');

describe('Default layout', () => {
  it('should be able to go to dashboard', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        signed: true,
        user: {
          name: faker.name.findName(),
        },
      })
    );

    const { getByTestId } = render(
      <Router history={history}>
        <Default>
          <template />
        </Default>
      </Router>
    );

    fireEvent.click(getByTestId('dashboard'));
    expect(history.location.pathname).toBe('/dashboard');
  });

  it('should be able to go to profile', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        signed: true,
        user: {
          name: faker.name.findName(),
        },
      })
    );

    const { getByText } = render(
      <Router history={history}>
        <Default>
          <template />
        </Default>
      </Router>
    );

    fireEvent.click(getByText('Meu Perfil'));
    expect(history.location.pathname).toBe('/profile');
  });

  it('should be able to logout', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        signed: true,
        user: {
          name: faker.name.findName(),
        },
      })
    );

    const { getByText } = render(
      <Router history={history}>
        <Default>
          <template />
        </Default>
      </Router>
    );

    fireEvent.click(getByText('Sair'));
    expect(dispatch).toHaveBeenCalledWith(signOut());
  });
});
