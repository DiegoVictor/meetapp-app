import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, wait } from '@testing-library/react';
import faker from 'faker';

import history from '~/services/history';
import Profile from '~/components/pages/Profile';
import { updateProfileRequest } from '~/store/actions/user';

jest.mock('react-redux');

jest.mock('~/services/history');
history.goBack = jest.fn();

describe('Profile page', () => {
  it('should be able to back to previous page', () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation(cb =>
      cb({
        user: {
          name: faker.name.findName(),
          email: faker.internet.email(),
        },
      })
    );

    const { getByTestId } = render(
      <MemoryRouter>
        <Profile history={history} />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('back'));
    expect(history.goBack).toHaveBeenCalled();
  });

  it("should be able to update profile's email and name", async () => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      old_password: '',
      password: '',
      confirm_password: '',
    };
    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb => cb({ user }));

    const { getByText } = render(
      <MemoryRouter>
        <Profile history={history} />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Salvar Perfil'));

    await wait(() => {
      expect(dispatch).toHaveBeenCalledWith(updateProfileRequest(user));
    });
  });

  it("should be able to update the profile's password", async () => {
    const password = faker.internet.password();
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      old_password: faker.internet.password(),
      password,
      confirm_password: password,
    };
    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb => cb({ user }));

    const { getByText } = render(
      <MemoryRouter>
        <Profile history={history} />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Salvar Perfil'));

    await wait(() => {
      expect(dispatch).toHaveBeenCalledWith(updateProfileRequest(user));
    });
  });
});
