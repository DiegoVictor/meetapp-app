import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';

import Profile from '~/pages/Profile';
import factory from '../utils/factory';
import { signOut, updateProfileRequest } from '~/store/actions/user';

jest.mock('react-redux');
jest.mock('../../src/components/Input', () => {
  const { TextInput } = require('react-native');
  return {
    __esModule: true,
    default: TextInput,
  };
});

describe('Profile', () => {
  it('should be able to update my profile', async () => {
    const [{ email, name, password }, user] = await factory.attrsMany(
      'User',
      2
    );

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockImplementation(cb => {
      return cb({ user });
    });

    const { getByPlaceholderText } = render(<Profile />);

    const nameInput = getByPlaceholderText('Nome completo');
    fireEvent.changeText(nameInput, name);
    fireEvent(nameInput, 'onSubmitEditing');

    const emailInput = getByPlaceholderText('Digite seu email');
    fireEvent.changeText(emailInput, email);
    fireEvent(emailInput, 'onSubmitEditing');

    const currentPasswordInput = getByPlaceholderText('Sua senha atual');
    fireEvent.changeText(currentPasswordInput, user.password);
    fireEvent(currentPasswordInput, 'onSubmitEditing');

    const newPasswordInput = getByPlaceholderText('Sua nova senha');
    fireEvent.changeText(newPasswordInput, password);
    fireEvent(newPasswordInput, 'onSubmitEditing');

    const confirmPasswordInput = getByPlaceholderText(
      'Confirme sua nova senha'
    );
    fireEvent.changeText(confirmPasswordInput, password);
    fireEvent(confirmPasswordInput, 'onSubmitEditing');

    await waitFor(() => expect(dispatch).toHaveBeenCalled());

    expect(dispatch).toHaveBeenCalledWith(
      updateProfileRequest({
        email,
        name,
        old_password: user.password,
        password,
        confirm_password: password,
      })
    );
  });

  it('should not be able to update my profile pressing submit button', async () => {
    const { email, name } = await factory.attrs('User');

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockImplementation(cb => {
      return cb({ user: { email, name } });
    });

    const { getByTestId } = render(<Profile />);

    fireEvent.press(getByTestId('submit'));

    expect(dispatch).toHaveBeenCalledWith(
      updateProfileRequest({
        email,
        name,
      })
    );
  });

  it('should not be able to logout', async () => {
    const { email, name } = await factory.attrs('User');

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockImplementation(cb => {
      return cb({ user: { email, name } });
    });

    const { getByText } = render(<Profile />);

    fireEvent.press(getByText('Logout'));

    expect(dispatch).toHaveBeenCalledWith(signOut());
  });
});
