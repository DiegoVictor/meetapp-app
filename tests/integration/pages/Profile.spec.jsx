import { fireEvent, render } from '@testing-library/react-native';
import { Profile } from '../../../src/pages/private/User/Profile';
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

const mockNavigate = jest.fn((args) => args);
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: (args) => mockNavigate(args),
    }),
  };
});

jest.mock('../../../src/components/BorderedTextInput', () => {
  const { TextInput } = require('react-native');
  return {
    BorderedTextInput: TextInput,
  };
});

describe('Profile', () => {
  it('should be able to update my profile', async () => {
    const [{ email, name }, user] = await factory.attrsMany('User', 2);

    mockUseSelector.mockImplementationOnce((cb) => {
      return cb({ user });
    });

    const { getByPlaceholderText } = await render(<Profile />);

    const nameInput = getByPlaceholderText('John Doe');
    await fireEvent.changeText(nameInput, name);
    await fireEvent(nameInput, 'submitEditing');

    const emailInput = getByPlaceholderText('johndoe@example.com');
    expect(emailInput).toHaveAccessibilityValue({ selected: true });

    await fireEvent.changeText(emailInput, email);
    await fireEvent(emailInput, 'submitEditing');

    expect(mockDispatch).toHaveBeenCalledWith(
      updateProfileRequest({
        email,
        name,
      })
    );
  });

  it('should be able to update my profile pressing submit button', async () => {
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

    await fireEvent.press(getByText('Sair da conta'));

    expect(mockDispatch).toHaveBeenCalledWith(signOut());
  });

  it('should be able to navigate to change password screen', async () => {
    const { email, name } = await factory.attrs('User');

    mockUseSelector.mockImplementationOnce((cb) => {
      return cb({ user: { email, name } });
    });

    const { getByText } = await render(<Profile />);

    await fireEvent.press(getByText('Alterar senha'));

    expect(mockNavigate).toHaveBeenCalledWith('ChangePassword');
  });
});
