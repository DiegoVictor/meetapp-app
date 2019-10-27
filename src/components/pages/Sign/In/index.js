import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import Logo from '../../../../assets/logo.png';

import Input from '../../../Input';
import Button from '../../../Button';
import { Container, Form, TextLink } from '../styles';
import Button from '~/components/Button';
import Input from '~/components/Input';
import Logo from '~/assets/logo.png';

export default function SignIn({ navigation }) {
  const password_ref = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  function handleSubmit() {
    dispatch(SignInRequest(email, password));
  }

  return (
    <Container>
      <Image source={Logo} />
      <Form>
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

        <Button onPress={handleSubmit}>Entrar</Button>
        <TextLink onPress={() => navigation.navigate('SignUp')}>
          Criar conta gratuita
        </TextLink>
      </Form>
    </Container>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
