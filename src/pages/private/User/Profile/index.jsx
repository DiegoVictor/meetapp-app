import { useRef, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { signOut, updateProfileRequest } from '../../../../store/actions/user';
import { Subtitle, Title } from '../../../../components/Title';
import { BorderedTextInput } from '../../../../components/BorderedTextInput';
import { FieldSet, Legend } from '../../../../components/FieldSet';
import { Form } from '../../../../components/Form';
import { getValidationErrors } from '../../../../helpers/getValidationErrors';
import { schema } from './validation';
import {
  Container,
  SaveButton,
  LogoutButton,
  ChangePasswordButton,
} from './styles';

export const Profile = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const emailRef = useRef();
  const user = useSelector((state) => state.user);

  const [name, setName] = useState(user.name ?? '');
  const [email, setEmail] = useState(user.email ?? '');

  const [errors, setErrors] = useState(null);

  const handleSubmit = async () => {
    try {
      setErrors(null);

      await schema.validate({ name, email }, { abortEarly: false });
      dispatch(updateProfileRequest({ name, email }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        setErrors(errors);
      } else {
        Alert.alert(
          'Erro na atualização',
          'Ocorreu um erro ao tentar atulizar seus dados.'
        );
      }
    }
  };

  return (
    <ScrollView>
      <Container>
        <Title>Meu Perfil</Title>
        <Subtitle>Gerencie seus dados e conta</Subtitle>

        <Form>
          <FieldSet>
            <Legend>Dados Pessoais</Legend>
            <BorderedTextInput
              label="Nome completo"
              leftIcon={
                <MaterialDesignIcons
                  name="account-box"
                  color="white"
                  size={24}
                />
              }
              autoCorrect={false}
              error={errors?.name}
              onChangeText={setName}
              onSubmitEditing={() => emailRef.current.focus()}
              placeholder="John Doe"
              returnKeyType="next"
              value={name}
            />

            <BorderedTextInput
              label="E-mail"
              leftIcon={
                <MaterialDesignIcons name="email" color="white" size={24} />
              }
              autoCapitalize="none"
              autoCorrect={false}
              error={errors?.email}
              keyboardType="email-address"
              onSubmitEditing={handleSubmit}
              onChangeText={setEmail}
              placeholder="johndoe@example.com"
              returnKeyType="next"
              ref={emailRef}
              value={email}
            />

            <SaveButton
              onPress={handleSubmit}
              testID="submit"
              leftIcon={
                <MaterialDesignIcons
                  color="white"
                  name="content-save-outline"
                  size={24}
                />
              }
            >
              Salvar alterações
            </SaveButton>
          </FieldSet>

          <FieldSet marginTop={40}>
            <Legend>Segurança</Legend>

            <ChangePasswordButton
              onPress={() => {
                navigate('ChangePassword');
              }}
              leftIcon={
                <MaterialDesignIcons
                  name="lock-outline"
                  color="white"
                  size={24}
                />
              }
              rightIcon={
                <MaterialDesignIcons
                  color="white"
                  name="chevron-right"
                  size={24}
                  style={{ marginLeft: 'auto' }}
                />
              }
            >
              Alterar senha
            </ChangePasswordButton>

            <LogoutButton
              onPress={() => dispatch(signOut())}
              testID="logout"
              leftIcon={
                <MaterialDesignIcons
                  name="logout-variant"
                  color="#F43F5E"
                  size={24}
                />
              }
            >
              Sair da conta
            </LogoutButton>
          </FieldSet>
        </Form>
      </Container>
    </ScrollView>
  );
};
