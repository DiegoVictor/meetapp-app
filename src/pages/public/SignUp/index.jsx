import { useRef, useState } from 'react';
import { Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import * as Yup from 'yup';
import Logo from '../../../assets/logo.png';
import { signUpRequest } from '../../../store/actions/user';
import { Subtitle, Title } from '../../../components/Title';
import { Form } from '../../../components/Form';
import { FieldSet, Legend } from '../../../components/FieldSet';
import { BorderedTextInput } from '../../../components/BorderedTextInput';
import { getValidationErrors } from '../../../helpers/getValidationErrors';
import { schema } from './validation';
import { Container, LoginButton, SignUpButton } from './styles';

export const SignUp = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState(null);

  const handleSubmit = async () => {
    try {
      setErrors(null);

      await schema.validate({ email, name, password }, { abortEarly: false });
      dispatch(signUpRequest(email, name, password));
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

      <Title marginTop={30}>Cadastre-se</Title>
      <Subtitle>Abra uma conta</Subtitle>

      <Form>
        <FieldSet>
          <Legend>Nome</Legend>
          <BorderedTextInput
            leftIcon={
              <MaterialDesignIcons name="account-box" color="white" size={24} />
            }
            size="lg"
            error={errors?.name}
            autoCorrect={false}
            onChangeText={setName}
            onSubmitEditing={() => emailRef.current.focus()}
            placeholder="Digite seu nome"
            returnKeyType="next"
            value={name}
          />
        </FieldSet>

        <FieldSet marginTop={15}>
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
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={setEmail}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder="Digite seu email"
            ref={emailRef}
            returnKeyType="next"
            value={email}
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
            ref={passwordRef}
            returnKeyType="send"
            secureTextEntry
            value={password}
          />
        </FieldSet>

        <SignUpButton onPress={handleSubmit} testID="submit">
          Cadastrar
        </SignUpButton>

        <LoginButton onPress={() => navigate('SignIn')} testID="signin">
          Já tenho conta
        </LoginButton>
      </Form>
    </Container>
  );
};
