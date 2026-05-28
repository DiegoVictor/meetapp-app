import React, { useCallback, useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../assets/logo.png';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { Container } from '../../../components/Container';
import { signUpRequest } from '../../../store/actions/user';
import { Form, TextLink } from './styles';

export const SignUp = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const passwordRef = useRef();
  const [password, setPassword] = useState('');
  const { navigate } = useNavigation();

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
