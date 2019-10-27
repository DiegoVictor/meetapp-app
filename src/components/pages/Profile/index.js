import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, FormButton, Separator } from './styles';
import { signOut, updateProfileRequest } from '~/store/actions/user';
import Input from '~/components/Input';

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

export default function Profile() {
  const confirm_password_ref = useRef();
  const dispatch = useDispatch();
  const email_ref = useRef();
  const old_password_ref = useRef();
  const password_ref = useRef();
  const user = useSelector(state => state.user);

  return (
    <ScrollView>
      <Container>
        <Form
          initialValues={user}
          validationSchema={schema}
          onSubmit={values => {
            dispatch(updateProfileRequest(values));
          }}
          render={fields => (
            <>
              <Input
                autoCorrect={false}
                error={fields.errors.name}
                onChangeText={fields.handleChange('name')}
                onSubmitEditing={() => email_ref.current.focus()}
                placeholder="Nome completo"
                returnKeyType="next"
                value={fields.values.name}
              />

              <Input
                autoCapitalize="none"
                autoCorrect={false}
                error={fields.errors.email}
                keyboardType="email-address"
                onSubmitEditing={() => old_password_ref.current.focus()}
                onChangeText={fields.handleChange('email')}
                placeholder="Digite seu email"
                returnKeyType="next"
                ref={email_ref}
                value={fields.values.email}
              />

              <Separator />

              <Input
                error={fields.errors.old_password}
                onSubmitEditing={() => password_ref.current.focus()}
                onChangeText={fields.handleChange('old_password')}
                placeholder="Sua senha atual"
                ref={old_password_ref}
                returnKeyType="next"
                secureTextEntry
              />

              <Input
                error={fields.errors.password}
                onChangeText={fields.handleChange('password')}
                onSubmitEditing={() => confirm_password_ref.current.focus()}
                placeholder="Sua nova senha"
                ref={password_ref}
                returnKeyType="next"
                secureTextEntry
              />

              <Input
                error={fields.errors.confirm_password}
                onSubmitEditing={fields.handleSubmit}
                onChangeText={fields.handleChange('confirm_password')}
                placeholder="Confirme sua nova senha"
                ref={confirm_password_ref}
                returnKeyType="send"
                secureTextEntry
              />

              <FormButton onPress={fields.handleSubmit}>
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
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
