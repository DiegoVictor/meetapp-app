import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import { signInRequest } from '../../../src/store/actions/user';
import { SignIn } from '../../../src/pages/public/SignIn';
import { factory } from '../../utils/factory';

jest.mock('react-redux');

const mockNavigate = jest.fn((args) => args);
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate(),
    }),
  };
});

jest.mock('../../../src/components/Input', () => {
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

    const { getByPlaceholderText, getByTestId } = await render(<SignIn />);

    fireEvent.changeText(getByPlaceholderText('Digite seu email'), email);
    fireEvent.changeText(getByPlaceholderText('Sua senha secreta'), password);

    fireEvent.press(getByTestId('submit'));

    expect(dispatch).toHaveBeenCalledWith(signInRequest(email, password));
  });

  it('should be able to sign in changing input focus and submitting from keyboard', async () => {
    const { email, password } = await factory.attrs('User');

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByPlaceholderText } = await render(<SignIn />);

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

    const { getByTestId } = await render(<SignIn />);

    fireEvent.press(getByTestId('signup'));

    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
    expect(dispatch).not.toHaveBeenCalled();
  });
});
