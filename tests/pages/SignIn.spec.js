import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';

import { signInRequest } from '~/store/actions/user';
import { SignIn } from '~/pages/Sign/In';
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

describe('SignIn', () => {
  it('should be able to sign in', async () => {
    const { email, password } = await factory.attrs('User');

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByPlaceholderText, getByTestId } = render(<SignIn />);

    fireEvent.changeText(getByPlaceholderText('Digite seu email'), email);
    fireEvent.changeText(getByPlaceholderText('Sua senha secreta'), password);

    fireEvent.press(getByTestId('submit'));

    expect(dispatch).toHaveBeenCalledWith(signInRequest(email, password));
  });

  it('should be able to sign in changing input focus and submitting from keyboard', async () => {
    const { email, password } = await factory.attrs('User');

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByPlaceholderText } = render(<SignIn />);

    const emailInput = getByPlaceholderText('Digite seu email');
    fireEvent.changeText(emailInput, email);
    fireEvent(emailInput, 'onSubmitEditing');

    const passwordInput = getByPlaceholderText('Sua senha secreta');
    fireEvent.changeText(passwordInput, password);
    fireEvent(passwordInput, 'onSubmitEditing');

    expect(dispatch).toHaveBeenCalledWith(signInRequest(email, password));
  });

  it('should be able to navigate to sign up screen', async () => {
    const dispatch = jest.fn();
    const navigator = { dispatch };

    setNavigator(navigator);
    const { getByTestId } = render(<SignIn />);

    fireEvent.press(getByTestId('signup'));

    expect(mockedNavigate).toHaveBeenCalledWith({ routeName: 'SignUp' });
    expect(dispatch).toHaveBeenCalledWith({ routeName: 'SignUp' });
  });
});
