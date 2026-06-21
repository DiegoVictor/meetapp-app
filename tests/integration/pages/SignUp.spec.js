import React, { act } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { signUpRequest } from '../../../src/store/actions/user';
import { SignUp } from '../../../src/pages/public/SignUp';
import { factory } from '../../utils/factory';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    useDispatch: () => mockDispatch,
  };
});

const mockNavigate = jest.fn((args) => args);
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: (args) => mockNavigate(args),
    }),
  };
});

jest.mock('../../../src/components/Input', () => {
  const { TextInput } = require('react-native');
  return {
    Input: TextInput,
  };
});

describe('SignUp', () => {
  it('should be able to sign up', async () => {
    const { name, email, password } = await factory.attrs('User');

    const { getByPlaceholderText, getByTestId } = await render(<SignUp />);

    await fireEvent.changeText(getByPlaceholderText('Nome completo'), name);
    await fireEvent.changeText(getByPlaceholderText('Digite seu email'), email);
    await fireEvent.changeText(
      getByPlaceholderText('Sua senha secreta'),
      password
    );

    await fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).toHaveBeenCalledWith(
      signUpRequest(email, name, password)
    );
  });

  it('should be able to sign up changing input focus and submitting from keyboard', async () => {
    const { name, email, password } = await factory.attrs('User');

    const { getByPlaceholderText, getByTestId } = await render(<SignUp />);

    const nameInput = getByPlaceholderText('Nome completo');
    await fireEvent.changeText(nameInput, name);
    await fireEvent(nameInput, 'submitEditing');

    const emailInput = getByPlaceholderText('Digite seu email');
    expect(emailInput).toHaveAccessibilityValue({ selected: true });

    await fireEvent.changeText(emailInput, email);
    await fireEvent(emailInput, 'submitEditing');

    const passwordInput = getByPlaceholderText('Sua senha secreta');
    expect(passwordInput).toHaveAccessibilityValue({ selected: true });

    await fireEvent.changeText(passwordInput, password);
    await fireEvent(passwordInput, 'submitEditing');

    expect(mockDispatch).toHaveBeenCalledWith(
      signUpRequest(email, name, password)
    );
  });

  it('should be able to navigate to sign in screen', async () => {
    const { getByTestId } = await render(<SignUp />);

    await fireEvent.press(getByTestId('signin'));

    expect(mockNavigate).toHaveBeenCalledWith('SignIn');
  });
});
