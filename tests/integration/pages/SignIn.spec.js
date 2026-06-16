import React, { act } from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { signInRequest } from '../../../src/store/actions/user';
import { SignIn } from '../../../src/pages/public/SignIn';
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

describe('SignIn', () => {
  it('should be able to sign in', async () => {
    const { email, password } = await factory.attrs('User');

    const { getByPlaceholderText, getByTestId } = await render(<SignIn />);

    act(() => {
      fireEvent.changeText(getByPlaceholderText('Digite seu email'), email);
      fireEvent.changeText(getByPlaceholderText('Sua senha secreta'), password);
    });

    fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).toHaveBeenCalledWith(signInRequest(email, password));
  });

  it('should be able to sign in changing input focus and submitting from keyboard', async () => {
    const { email, password } = await factory.attrs('User');

    const { getByPlaceholderText } = await render(<SignIn />);

    const emailInput = getByPlaceholderText('Digite seu email');
    const passwordInput = getByPlaceholderText('Sua senha secreta');

    act(() => {
      fireEvent.changeText(emailInput, email);
      fireEvent(emailInput, 'submitEditing');

      expect(passwordInput).toHaveAccessibilityValue({ selected: true });

      fireEvent.changeText(passwordInput, password);
    });

    fireEvent(passwordInput, 'submitEditing');

    expect(mockDispatch).toHaveBeenCalledWith(signInRequest(email, password));
  });

  it('should be able to navigate to sign up screen', async () => {
    const { getByTestId } = await render(<SignIn />);

    fireEvent.press(getByTestId('signup'));

    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
