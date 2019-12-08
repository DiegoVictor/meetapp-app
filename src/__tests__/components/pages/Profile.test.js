import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { act, fireEvent, render } from '@testing-library/react';
import faker from 'faker';

import history from '~/services/history';
import Profile from '~/components/pages/Profile';
import { updateProfileRequest } from '~/store/actions/user';

jest.mock('react-redux');
jest.mock('~/services/history');

const dispatch = jest.fn();
history.goBack = jest.fn();

useDispatch.mockReturnValue(dispatch);

describe('Profile page', () => {
  it('should be able to back to previous page', () => {
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
    useSelector.mockImplementation(cb => cb({ user }));

    const { getByTestId } = render(
      <MemoryRouter>
        <Profile history={history} />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.submit(getByTestId('form'));
    });

      expect(dispatch).toHaveBeenCalledWith(updateProfileRequest(user));
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
    useSelector.mockImplementation(cb => cb({ user }));

    const { getByTestId } = render(
      <MemoryRouter>
        <Profile history={history} />
      </MemoryRouter>
    );

    await act(async () => {
      fireEvent.submit(getByTestId('form'));
    });

      expect(dispatch).toHaveBeenCalledWith(updateProfileRequest(user));
    });
  });
});
