import React, { useCallback, useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import Logo from '~/assets/logo.png';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { navigate } from '~/services/navigator';
import { signUpRequest } from '~/store/actions/user';
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

export const SignUp = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const passwordRef = useRef();
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(() => {
    dispatch(signUpRequest(email, name, password));
  }, [email, name, password]);

  return (
    <Container>
      <Image source={Logo} />
      <Form validationSchema={schema}>
        <Input
          autoCorrect={false}
          onChangeText={setName}
          onSubmitEditing={() => emailRef.current.focus()}
          placeholder="Nome completo"
          returnKeyType="next"
          value={name}
        />

        <Input
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

        <Input
          onChangeText={setPassword}
          onSubmitEditing={handleSubmit}
          placeholder="Sua senha secreta"
          ref={passwordRef}
          returnKeyType="send"
          secureTextEntry
          value={password}
        />

        <Button onPress={handleSubmit} testID="submit">
          Cadastrar
        </Button>
        <TextLink onPress={() => navigate('SignIn')} testID="signin">
          Já tenho conta
        </TextLink>
      </Form>
    </Container>
  );
};
