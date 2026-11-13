import { Alert } from 'react-native';
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

describe('SignIn', () => {
  it('should be able to sign in', async () => {
    const { email, password } = await factory.attrs('User');

    const { getByPlaceholderText, getByTestId } = await render(<SignIn />);

    await fireEvent.changeText(getByPlaceholderText('Digite seu email'), email);
    await fireEvent.changeText(getByPlaceholderText('●●●●●●●'), password);

    await fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).toHaveBeenCalledWith(signInRequest(email, password));
  });

  it('should not be able to sign in when dispatch fails', async () => {
    const { email, password } = await factory.attrs('User');

    mockDispatch.mockImplementationOnce(() => {
      throw new Error();
    });
    const alert = jest.spyOn(Alert, 'alert');

    const { getByPlaceholderText, getByTestId } = await render(<SignIn />);

    await fireEvent.changeText(getByPlaceholderText('Digite seu email'), email);
    await fireEvent.changeText(getByPlaceholderText('●●●●●●●'), password);

    await fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).toHaveBeenCalledWith(signInRequest(email, password));
    expect(alert).toHaveBeenCalledWith(
      'Erro na autenticação',
      'Ocorreu um erro ao fazer login, cheque as credenciais.'
    );
  });

  it('should be able to check validation errors', async () => {
    const { getByText, getByTestId } = await render(<SignIn />);

    await fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(getByText('O campo email é obrigatório')).toBeTruthy();
    expect(getByText('O campo senha é obrigatório')).toBeTruthy();
  });

  it('should be able to sign in changing input focus and submitting from keyboard', async () => {
    const { email, password } = await factory.attrs('User');

    const { getByPlaceholderText } = await render(<SignIn />);

    const emailInput = getByPlaceholderText('Digite seu email');
    await fireEvent.changeText(emailInput, email);

    await fireEvent(emailInput, 'submitEditing');
    const passwordInput = getByPlaceholderText('●●●●●●●');
    expect(passwordInput).toHaveAccessibilityValue({ selected: true });

    await fireEvent.changeText(passwordInput, password);
    await fireEvent(passwordInput, 'submitEditing');

    expect(mockDispatch).toHaveBeenCalledWith(signInRequest(email, password));
  });

  it('should be able to navigate to sign up screen', async () => {
    const { getByTestId } = await render(<SignIn />);

    await fireEvent.press(getByTestId('signup'));

    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
