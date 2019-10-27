import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native';
import * as Yup from 'yup';

import { signOut, updateProfileRequest } from '~/store/actions/user';
import Input from '~/components/Input';

const schema = Yup.object().shape({
  name: Yup.string('O nome precisa ser um texto'),
  email: Yup.string('O email precisa ser um texto').email(
    'O email precisa ser válido'
  ),
  old_password: Yup.string('A senha precisa ser um texto'),
  password: Yup.string('A senha precisa ser um texto')
    .min(6, 'A senha deve conter no minimo 6 caracteres')
    .when('old_password', (old_password, field) =>
      old_password ? field.required('O campo senha é obrigatório') : field
    ),
  confirm_password: Yup.string(
    'A confirmmação da senha precisa ser um texto'
  ).when('password', (password, field) => {
    return password
      ? field
          .required('O campo confirmação de senha é obrigatório')
          .oneOf([Yup.ref('password')])
      : field;
  }),
});

export default function Profile() {
  const user = useSelector(state => state.user);

  const email_ref = useRef();
  const old_password_ref = useRef();
  const password_ref = useRef();
  const confirm_password_ref = useRef();

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Container>
        <Form
          initialValues={user}
          validationSchema={schema}
          onSubmit={values => {
            dispatch(updateUserRequest(values));
          }}
          render={props => (
            <>
              <Input
                autoCorrect={false}
                placeholder="Nome completo"
                returnKeyType="next"
                onSubmitEditing={() => email_ref.current.focus()}
                onChangeText={props.handleChange('name')}
                value={props.values.name}
                error={props.errors.name}
              />

              <Input
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Digite seu email"
                returnKeyType="next"
                onSubmitEditing={() => old_password_ref.current.focus()}
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                error={props.errors.email}
              />

              <Separator />

              <Input
                secureTextEntry
                placeholder="Sua senha atual"
                ref={old_password_ref}
                returnKeyType="next"
                onSubmitEditing={() => password_ref.current.focus()}
                onChangeText={props.handleChange('old_password')}
                error={props.errors.old_password}
              />

              <Input
                secureTextEntry
                placeholder="Sua nova senha"
                ref={password_ref}
                returnKeyType="next"
                onSubmitEditing={() => confirm_password_ref.current.focus()}
                onChangeText={props.handleChange('password')}
                error={props.errors.password}
              />

              <Input
                secureTextEntry
                placeholder="Confirme sua nova senha"
                ref={confirm_password_ref}
                returnKeyType="send"
                onSubmitEditing={props.handleSubmit}
                onChangeText={props.handleChange('confirm_password')}
                error={props.errors.confirm_password}
              />

              <FormButton onPress={props.handleSubmit}>
                Salvar perfil
              </FormButton>
              <FormButton onPress={() => dispatch(SignOut())}>
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
