import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import { signUpRequest } from '../../../src/store/actions/user';
import { SignUp } from '../../../src/pages/public/SignUp';
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

describe('SignUp', () => {
  it('should be able to sign up', async () => {
    const { name, email, password } = await factory.attrs('User');

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByPlaceholderText, getByTestId } = await render(<SignUp />);

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

    const { getByPlaceholderText } = await render(<SignUp />);

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

    const { getByTestId } = await render(<SignUp />);

    fireEvent.press(getByTestId('signin'));

    expect(mockNavigate).toHaveBeenCalledWith('SignIn');
    expect(dispatch).not.toHaveBeenCalled();
  });
});
