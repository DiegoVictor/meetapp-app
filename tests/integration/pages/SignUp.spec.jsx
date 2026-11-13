import { Alert } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
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

describe('SignUp', () => {
  it('should be able to sign up', async () => {
    const { name, email, password } = await factory.attrs('User');
    const { getByPlaceholderText, getByTestId } = await render(<SignUp />);

    await fireEvent.changeText(getByPlaceholderText('Digite seu nome'), name);
    await fireEvent.changeText(getByPlaceholderText('Digite seu email'), email);
    await fireEvent.changeText(getByPlaceholderText('●●●●●●●'), password);

    await fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).toHaveBeenCalledWith(
      signUpRequest(email, name, password)
    );
  });

  it('should not be able to sign up when dispatch fails', async () => {
    const { name, email, password } = await factory.attrs('User');

    mockDispatch.mockImplementationOnce(() => {
      throw new Error();
    });
    const alert = jest.spyOn(Alert, 'alert');

    const { getByPlaceholderText, getByTestId } = await render(<SignUp />);

    await fireEvent.changeText(getByPlaceholderText('Digite seu nome'), name);
    await fireEvent.changeText(getByPlaceholderText('Digite seu email'), email);
    await fireEvent.changeText(getByPlaceholderText('●●●●●●●'), password);

    await fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).toHaveBeenCalledWith(
      signUpRequest(email, name, password)
    );
    expect(alert).toHaveBeenCalledWith(
      'Erro na autenticação',
      'Ocorreu um erro ao fazer login, cheque as credenciais.'
    );
  });

  it('should be able to check validation errors', async () => {
    const { getByText, getByTestId } = await render(<SignUp />);

    await fireEvent.press(getByTestId('submit'));

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(getByText('O campo email é obrigatório')).toBeTruthy();
    expect(getByText('O campo nome é obrigatório')).toBeTruthy();
    expect(getByText('O campo senha é obrigatório')).toBeTruthy();
  });

  it('should be able to sign up changing input focus and submitting from keyboard', async () => {
    const { name, email, password } = await factory.attrs('User');

    const { getByPlaceholderText, getByTestId } = await render(<SignUp />);

    const nameInput = getByPlaceholderText('Digite seu nome');
    await fireEvent.changeText(nameInput, name);
    await fireEvent(nameInput, 'submitEditing');

    const emailInput = getByPlaceholderText('Digite seu email');
    expect(emailInput).toHaveAccessibilityValue({ selected: true });

    await fireEvent.changeText(emailInput, email);
    await fireEvent(emailInput, 'submitEditing');

    const passwordInput = getByPlaceholderText('●●●●●●●');
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
