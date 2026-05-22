import React, { useCallback, useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../assets/logo.png';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Container } from '../../../components/Container';
import { signInRequest } from '../../../store/actions/user';
import { schema } from './validation';
import { Form, TextLink } from './styles';

export const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const passwordRef = useRef();
  const [password, setPassword] = useState('');
  const { navigate } = useNavigation();

  const handleSubmit = useCallback(() => {
    dispatch(signInRequest(email, password));
  }, [email, password]);

  return (
    <Container>
      <Image source={Logo} />
      <Form validationSchema={schema}>
        <Input
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu email"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          secureTextEntry
          placeholder="Sua senha secreta"
          ref={passwordRef}
          returnKeyType="send"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleSubmit}
        />

        <Button onPress={handleSubmit} testID="submit">
          Entrar
        </Button>
        <TextLink onPress={() => navigate('SignUp')} testID="signup">
          Criar conta gratuita
        </TextLink>
      </Form>
    </Container>
  );
};
