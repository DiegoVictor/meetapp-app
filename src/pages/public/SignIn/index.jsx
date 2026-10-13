import { useCallback, useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { signInRequest } from '../../../store/actions/user';
import { schema } from './validation';
import Logo from '../../../assets/logo.png';
import { Title, Subtitle } from '../../../components/Title';
import { FieldSet, Legend } from '../../../components/FieldSet';
import { BorderedTextInput } from '../../../components/BorderedTextInput';
import { Container, RegisterButton, SignInButton } from './styles';
import { Form } from '../../../components/Form';

export const SignIn = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const passwordRef = useRef();
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(() => {
    dispatch(signInRequest(email, password));
  }, [email, password]);

  return (
    <Container>
      <Image source={Logo} />

      <Title marginTop={30}>Bem-vindo</Title>
      <Subtitle>Entre na sua conta para continuar</Subtitle>

      <Form validationSchema={schema} marginTop={50}>
        {(fields) => (
          <>
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
                error={fields.errors.email}
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
                error={fields.errors.password}
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
          </>
        )}
      </Form>
    </Container>
  );
};
