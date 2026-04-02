import React, { useCallback, useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import Logo from '~/assets/logo.png';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { signInRequest } from '~/store/actions/user';
import { navigate } from '~/services/navigator';
import { Container, Form, TextLink } from '../styles';

const schema = Yup.object().shape({
  email: Yup.string('O email precisa ser um texto')
    .email('O email precisa ser válido')
    .required(),
  name: Yup.string('O nome precisa ser um texto').required(),
  password: Yup.string('A senha precisa ser um texto')
    .min(6, 'A senha deve conter no minimo 6 caracteres')
    .required(),
});

export default () => {
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
