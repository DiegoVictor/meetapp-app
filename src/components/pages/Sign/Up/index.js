import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import Logo from '../../../../assets/logo.png';

import { signUpRequest } from '~/store/actions/user';
import { Container, Form, TextLink } from '../styles';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Logo from '~/assets/logo.png';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const email_ref = useRef();
  const password_ref = useRef();

  const dispatch = useDispatch();
  function handleSubmit() {
    dispatch(SignUpRequest(name, email, password));
  }

  return (
    <Container>
      <Image source={Logo} />
      <Form>
        <Input
          autoCorrect={false}
          placeholder="Nome completo"
          returnKeyType="next"
          onSubmitEditing={() => email_ref.current.focus()}
          value={name}
          onChangeText={setName}
        />

        <Input
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu email"
          returnKeyType="next"
          onSubmitEditing={() => password_ref.current.focus()}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          secureTextEntry
          placeholder="Sua senha secreta"
          ref={password_ref}
          returnKeyType="send"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleSubmit}
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
