import { fireEvent, render } from '@testing-library/react-native';
import { ChangePassword } from '../../../src/pages/private/User/ChangePassword';
import { factory } from '../../utils/factory';
import { signOut, updateProfileRequest } from '../../../src/store/actions/user';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    useDispatch: () => mockDispatch,
  };
});

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: (args) => mockGoBack(),
    }),
  };
});

jest.mock('../../../src/components/BorderedTextInput', () => {
  const { TextInput } = require('react-native');
  return {
    BorderedTextInput: TextInput,
  };
});

describe('ChangePassword', () => {
  it('should be able to change password', async () => {
    const { getByTestId } = await render(<ChangePassword />);

    const oldPassword = getByTestId('old-password');
    await fireEvent.changeText(oldPassword, '123456');
    await fireEvent(oldPassword, 'submitEditing');

    const password = getByTestId('password');
    await fireEvent.changeText(password, 'abcdef');
    await fireEvent(password, 'submitEditing');

    const confirmPassword = getByTestId('confirm-password');
    await fireEvent.changeText(confirmPassword, 'abcdef');
    await fireEvent(confirmPassword, 'submitEditing');

    expect(mockDispatch).toHaveBeenCalledWith(
      updateProfileRequest({
        old_password: '123456',
        password: 'abcdef',
        confirm_password: 'abcdef',
      })
    );
  });

  it('should be able to update password pressing submit button', async () => {
    const { getByTestId } = await render(<ChangePassword />);

    await fireEvent.changeText(getByTestId('old-password'), '123456');
    await fireEvent.changeText(getByTestId('password'), 'abcdef');
    await fireEvent.changeText(getByTestId('confirm-password'), 'abcdef');

    await fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).toHaveBeenCalledWith(
      updateProfileRequest({
        old_password: '123456',
        password: 'abcdef',
        confirm_password: 'abcdef',
      })
    );
  });

  it('should be able to go back', async () => {
    const { getByTestId } = await render(<ChangePassword />);

    await fireEvent.press(getByTestId('go-back'));

    expect(mockGoBack).toHaveBeenCalled();
  });
});
