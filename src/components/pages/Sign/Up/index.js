import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { signUpRequest } from '~/store/actions/user';
import { Container, Form, TextLink } from '../styles';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Logo from '~/assets/logo.png';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const email_ref = useRef();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const password_ref = useRef();
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(signUpRequest(email, name, password));
  }

  return (
    <Container>
      <Image source={Logo} />
      <Form>
        <Input
          autoCorrect={false}
          onChangeText={setName}
          onSubmitEditing={() => email_ref.current.focus()}
          placeholder="Nome completo"
          returnKeyType="next"
          value={name}
        />

        <Input
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          onSubmitEditing={() => password_ref.current.focus()}
          placeholder="Digite seu email"
          ref={email_ref}
          returnKeyType="next"
          value={email}
        />

        <Input
          onChangeText={setPassword}
          onSubmitEditing={handleSubmit}
          placeholder="Sua senha secreta"
          ref={password_ref}
          returnKeyType="send"
          secureTextEntry
          value={password}
        />

        <Button onPress={handleSubmit}>Cadastrar</Button>
        <TextLink onPress={() => navigation.navigate('SignIn')}>
          Já tenho conta
        </TextLink>
      </Form>
    </Container>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
