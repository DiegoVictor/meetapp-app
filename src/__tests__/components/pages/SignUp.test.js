import React from 'react';
import { useDispatch } from 'react-redux';
import { MemoryRouter, Router } from 'react-router-dom';
import { fireEvent, render, act } from '@testing-library/react';
import faker from 'faker';

import { signUpRequest } from '~/store/actions/user';
import history from '~/services/history';
import SignUp from '~/components/pages/Sign/Up';

jest.mock('react-redux');

const name = faker.name.findName();
const email = faker.internet.email();
const password = faker.internet.password();
const dispatch = jest.fn();

useDispatch.mockReturnValue(dispatch);

describe('SignUp page', () => {
  it('should be able to register', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Nome completo'), {
      target: { value: name },
    });

    fireEvent.change(getByPlaceholderText('Digite seu e-mail'), {
      target: { value: email },
    });

    fireEvent.change(getByPlaceholderText('Sua senha secreta'), {
      target: { value: password },
    });

    await act(async () => {
      fireEvent.submit(getByTestId('form'));
    });

    expect(dispatch).toHaveBeenCalledWith(signUpRequest(email, name, password));
  });

  it('should be able to click on signin link', async () => {
    const { getByText } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );

    fireEvent.click(getByText('Já tenho conta'));
    expect(history.location.pathname).toBe('/');
  });
});
