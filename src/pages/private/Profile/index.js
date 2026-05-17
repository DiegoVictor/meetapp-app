import React, { useCallback, useRef } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../../components/Input';
import { signOut, updateProfileRequest } from '../../../store/actions/user';
import { schema } from './validation';
import { Container, Form, FormButton, Separator } from './styles';

export const Profile = () => {
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const user = useSelector((state) => state.user);

  const handleSubmit = useCallback((values) => {
    dispatch(updateProfileRequest(values));
  }, []);

  return (
    <ScrollView>
      <Container>
        <Form
          initialValues={user}
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          render={(fields) => (
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
