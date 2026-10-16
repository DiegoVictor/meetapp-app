import { useRef, useState } from 'react';
import { Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import * as Yup from 'yup';
import { signInRequest } from '../../../store/actions/user';
import Logo from '../../../assets/logo.png';
import { Title, Subtitle } from '../../../components/Title';
import { FieldSet, Legend } from '../../../components/FieldSet';
import { BorderedTextInput } from '../../../components/BorderedTextInput';
import { Form } from '../../../components/Form';
import { getValidationErrors } from '../../../helpers/getValidationErrors';
import { schema } from './validation';
import { Container, RegisterButton, SignInButton } from './styles';

export const SignIn = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);

  const handleSubmit = async () => {
    try {
      setErrors(null);

      await schema.validate({ email, password }, { abortEarly: false });
      dispatch(signInRequest(email, password));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        setErrors(errors);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.'
        );
      }
    }
  };

  return (
    <Container>
      <Image source={Logo} />

      <Title marginTop={30}>Bem-vindo</Title>
      <Subtitle>Entre na sua conta para continuar</Subtitle>

      <Form>
        <FieldSet>
          <Legend>E-mail</Legend>
          <BorderedTextInput
            leftIcon={
              <MaterialDesignIcons
                name="email-outline"
                color="white"
                size={24}
              />
            }
            size="lg"
            error={errors?.email}
            autoCorrect={false}
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="Digite seu email"
            keyboardType="email-address"
            value={email}
            autoCapitalize="none"
            returnKeyType="next"
          />
        </FieldSet>
        <FieldSet marginTop={15}>
          <Legend>Senha</Legend>
          <BorderedTextInput
            leftIcon={
              <MaterialDesignIcons
                name="lock-outline"
                color="white"
                size={24}
              />
            }
            size="lg"
            error={errors?.password}
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
            placeholder="●●●●●●●"
            returnKeyType="send"
            ref={passwordRef}
            value={password}
            secureTextEntry
          />
        </FieldSet>

        <SignInButton onPress={handleSubmit} testID="submit">
          Entrar
        </SignInButton>

        <RegisterButton onPress={() => navigate('SignUp')} testID="signup">
          Criar conta gratuita
        </RegisterButton>
      </Form>
    </Container>
  );
};
