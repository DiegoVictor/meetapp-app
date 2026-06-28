import React, { act } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Profile } from '../../../src/pages/private/Profile';
import { factory } from '../../utils/factory';
import { signOut, updateProfileRequest } from '../../../src/store/actions/user';

const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();
jest.mock('react-redux', () => {
  return {
    useDispatch: () => mockDispatch,
    useSelector: (cb) => mockUseSelector(cb),
  };
});

jest.mock('../../../src/components/Input', () => {
  const { TextInput } = require('react-native');
  return {
    Input: TextInput,
  };
});

describe('Profile', () => {
  it('should be able to update my profile', async () => {
    const [{ email, name, password }, user] = await factory.attrsMany(
      'User',
      2
    );

    mockUseSelector.mockImplementationOnce((cb) => {
      return cb({ user });
    });

    const { getByPlaceholderText } = await render(<Profile />);

    const nameInput = getByPlaceholderText('Nome completo');
    await fireEvent.changeText(nameInput, name);
    await fireEvent(nameInput, 'submitEditing');

    const emailInput = getByPlaceholderText('Digite seu email');
    expect(emailInput).toHaveAccessibilityValue({ selected: true });

    await fireEvent.changeText(emailInput, email);
    await fireEvent(emailInput, 'submitEditing');

    const currentPasswordInput = getByPlaceholderText('Sua senha atual');
    expect(currentPasswordInput).toHaveAccessibilityValue({ selected: true });

    await fireEvent.changeText(currentPasswordInput, user.password);
    await fireEvent(currentPasswordInput, 'submitEditing');

    const newPasswordInput = getByPlaceholderText('Sua nova senha');
    expect(newPasswordInput).toHaveAccessibilityValue({ selected: true });

    await fireEvent.changeText(newPasswordInput, password);
    await fireEvent(newPasswordInput, 'submitEditing');

    const confirmPasswordInput = getByPlaceholderText(
      'Confirme sua nova senha'
    );
    expect(confirmPasswordInput).toHaveAccessibilityValue({ selected: true });

    await fireEvent.changeText(confirmPasswordInput, password);
    await fireEvent(confirmPasswordInput, 'submitEditing');

    expect(mockDispatch).toHaveBeenCalledWith(
      updateProfileRequest({
        email,
        name,
        old_password: user.password,
        password,
        confirm_password: password,
      })
    );
  });

  it('should be able to update my profile without password change', async () => {
    const [{ email, name }, user] = await factory.attrsMany('User', 2, {
      password: undefined,
    });

    mockUseSelector.mockImplementationOnce((cb) => {
      return cb({ user });
    });

    const { getByPlaceholderText, getByTestId } = await render(<Profile />);

    const nameInput = getByPlaceholderText('Nome completo');
    await fireEvent.changeText(nameInput, name);

    const emailInput = getByPlaceholderText('Digite seu email');
    await fireEvent.changeText(emailInput, email);

    await fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).toHaveBeenCalledWith(
      updateProfileRequest({
        email,
        name,
      })
    );
  });

  it('should not be able to update my profile pressing submit button', async () => {
    const { email, name } = await factory.attrs('User');

    mockUseSelector.mockImplementationOnce((cb) => {
      return cb({ user: { email, name } });
    });

    const { getByTestId } = await render(<Profile />);

    await fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).toHaveBeenCalledWith(
      updateProfileRequest({
        email,
        name,
      })
    );
  });

  it('should be able to logout', async () => {
    const { email, name } = await factory.attrs('User');

    mockUseSelector.mockImplementationOnce((cb) => {
      return cb({ user: { email, name } });
    });

    const { getByText } = await render(<Profile />);

    await fireEvent.press(getByText('Logout'));

    expect(mockDispatch).toHaveBeenCalledWith(signOut());
  });
});
