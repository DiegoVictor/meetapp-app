import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';

import { signUpRequest } from '~/store/actions/user';
import { SignUp } from '~/pages/Sign/Up';
import factory from '../utils/factory';
import { setNavigator } from '~/services/navigator';

jest.mock('react-redux');

const mockedNavigate = jest.fn(args => args);
jest.mock('react-navigation', () => {
  return {
    NavigationActions: {
      navigate: args => {
        return mockedNavigate(args);
      },
    },
  };
});

jest.mock('../../src/components/Input', () => {
  const { TextInput } = require('react-native');
  return {
    __esModule: true,
    default: TextInput,
  };
});

describe('SignUp', () => {
  it('should be able to sign up', async () => {
    const { name, email, password } = await factory.attrs('User');

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByPlaceholderText, getByTestId } = render(<SignUp />);

    fireEvent.changeText(getByPlaceholderText('Nome completo'), name);
    fireEvent.changeText(getByPlaceholderText('Digite seu email'), email);
    fireEvent.changeText(getByPlaceholderText('Sua senha secreta'), password);

    fireEvent.press(getByTestId('submit'));

    expect(dispatch).toHaveBeenCalledWith(signUpRequest(email, name, password));
  });

  it('should be able to sign up changing input focus and submitting from keyboard', async () => {
    const { name, email, password } = await factory.attrs('User');

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByPlaceholderText } = render(<SignUp />);

    const nameInput = getByPlaceholderText('Nome completo');
    fireEvent.changeText(nameInput, name);
    fireEvent(nameInput, 'onSubmitEditing');

    const emailInput = getByPlaceholderText('Digite seu email');
    fireEvent.changeText(emailInput, email);
    fireEvent(emailInput, 'onSubmitEditing');

    const passwordInput = getByPlaceholderText('Sua senha secreta');
    fireEvent.changeText(passwordInput, password);
    fireEvent(passwordInput, 'onSubmitEditing');

    expect(dispatch).toHaveBeenCalledWith(signUpRequest(email, name, password));
  });

  it('should be able to navigate to sign in screen', async () => {
    const dispatch = jest.fn();
    const navigator = { dispatch };

    setNavigator(navigator);

    const { getByTestId } = render(<SignUp />);

    fireEvent.press(getByTestId('signin'));

    expect(mockedNavigate).toHaveBeenCalledWith({ routeName: 'SignIn' });
    expect(dispatch).toHaveBeenCalledWith({ routeName: 'SignIn' });
  });
});
