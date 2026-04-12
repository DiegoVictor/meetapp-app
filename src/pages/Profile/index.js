import React, { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { signOut, updateProfileRequest } from '~/store/actions/user';
import Input from '~/components/Input';
import { Container, Form, FormButton, Separator } from './styles';

const schema = Yup.object().shape({
  confirm_password: Yup.string(
    'A confirmmação da senha precisa ser um texto'
  ).when('password', (password, field) => {
    return password
      ? field
          .required('O campo confirmação de senha é obrigatório')
          .oneOf([Yup.ref('password')])
      : field;
  }),
  email: Yup.string('O email precisa ser um texto').email(
    'O email precisa ser válido'
  ),
  name: Yup.string('O nome precisa ser um texto'),
  old_password: Yup.string('A senha precisa ser um texto'),
  password: Yup.string('A senha precisa ser um texto')
    .min(6, 'A senha deve conter no minimo 6 caracteres')
    .when('old_password', (old_password, field) =>
      old_password ? field.required('O campo senha é obrigatório') : field
    ),
});

export default () => {
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const user = useSelector(state => state.user);

  const handleSubmit = useCallback(values => {
    dispatch(updateProfileRequest(values));
  }, []);

  return (
    <ScrollView>
      <Container>
        <Form
          initialValues={user}
          validationSchema={schema}
          onSubmit={values => {
            handleSubmit(values);
          }}
          render={fields => (
            <>
              <Input
                autoCorrect={false}
                error={fields.errors.name}
                onChangeText={fields.handleChange('name')}
                onSubmitEditing={() => emailRef.current.focus()}
                placeholder="Nome completo"
                returnKeyType="next"
                value={fields.values.name}
              />

              <Input
                autoCapitalize="none"
                autoCorrect={false}
                error={fields.errors.email}
                keyboardType="email-address"
                onSubmitEditing={() => oldPasswordRef.current.focus()}
                onChangeText={fields.handleChange('email')}
                placeholder="Digite seu email"
                returnKeyType="next"
                ref={emailRef}
                value={fields.values.email}
              />

              <Separator />

              <Input
                error={fields.errors.old_password}
                onSubmitEditing={() => passwordRef.current.focus()}
                onChangeText={fields.handleChange('old_password')}
                placeholder="Sua senha atual"
                ref={oldPasswordRef}
                returnKeyType="next"
                secureTextEntry
              />

              <Input
                error={fields.errors.password}
                onChangeText={fields.handleChange('password')}
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
                placeholder="Sua nova senha"
                ref={passwordRef}
                returnKeyType="next"
                secureTextEntry
              />

              <Input
                error={fields.errors.confirm_password}
                onSubmitEditing={fields.handleSubmit}
                onChangeText={fields.handleChange('confirm_password')}
                placeholder="Confirme sua nova senha"
                ref={confirmPasswordRef}
                returnKeyType="send"
                secureTextEntry
              />

              <FormButton
                onPress={() => handleSubmit(fields.values)}
                testID="submit"
              >
                Salvar perfil
              </FormButton>
              <FormButton onPress={() => dispatch(signOut())}>
                Logout
              </FormButton>
            </>
          )}
        />
      </Container>
    </ScrollView>
  );
};
