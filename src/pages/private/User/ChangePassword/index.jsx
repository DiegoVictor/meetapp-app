import { useCallback, useRef, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Subtitle, Title } from '../../../../components/Title';
import { Form } from '../../../../components/Form';
import { FieldSet, Legend } from '../../../../components/FieldSet';
import { BorderedTextInput } from '../../../../components/BorderedTextInput';
import { updateProfileRequest } from '../../../../store/actions/user';
import { getValidationErrors } from '../../../../helpers/getValidationErrors';
import { schema } from './validation';
import { BackButton, Container, SaveButton } from './styles';

export const ChangePassword = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();

  const confirmPasswordRef = useRef();
  const passwordRef = useRef();
  const oldPasswordRef = useRef();

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState(null);

  const handleSubmit = async () => {
    try {
      setErrors(null);

      await schema.validate(
        { oldPassword, password, confirmPassword },
        { abortEarly: false }
      );

      dispatch(
        updateProfileRequest({
          old_password: oldPassword,
          password,
          confirm_password: confirmPassword,
        })
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        setErrors(errors);
      } else {
        Alert.alert(
          'Erro na atualização',
          'Ocorreu um erro ao atualizar sua senha.'
        );
      }
    }
  };

  return (
    <ScrollView>
      <Container>
        <BackButton
          testID="go-back"
          onPress={() => {
            goBack();
          }}
        >
          <MaterialDesignIcons name="arrow-left" color="white" size={28} />
        </BackButton>

        <Title>Alterar senha</Title>
        <Subtitle>
          Informe sua senha atual e crie uma senha nova segura
        </Subtitle>

        <Form>
          <FieldSet>
            <Legend>Senha Atual</Legend>
            <BorderedTextInput
              leftIcon={
                <MaterialDesignIcons
                  name="lock-outline"
                  color="white"
                  size={24}
                />
              }
              size="lg"
              testID="old-password"
              error={errors?.oldPassword}
              onSubmitEditing={() => passwordRef.current.focus()}
              onChangeText={setOldPassword}
              placeholder="●●●●●●●"
              ref={oldPasswordRef}
              returnKeyType="next"
              secureTextEntry
            />
          </FieldSet>

          <FieldSet>
            <Legend>Nova Senha</Legend>
            <BorderedTextInput
              leftIcon={
                <MaterialDesignIcons
                  name="lock-outline"
                  color="white"
                  size={24}
                />
              }
              size="lg"
              testID="password"
              error={errors?.password}
              onChangeText={setPassword}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              placeholder="Digite a nova senha"
              ref={passwordRef}
              returnKeyType="next"
              secureTextEntry
            />
            <BorderedTextInput
              leftIcon={
                <MaterialDesignIcons
                  name="lock-outline"
                  color="white"
                  size={24}
                />
              }
              size="lg"
              testID="confirm-password"
              error={errors?.confirmPassword}
              onSubmitEditing={handleSubmit}
              onChangeText={setConfirmPassword}
              placeholder="Confirme a nova senha"
              ref={confirmPasswordRef}
              returnKeyType="send"
              secureTextEntry
            />
          </FieldSet>

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
            Alterar senha
          </SaveButton>
        </Form>
      </Container>
    </ScrollView>
  );
};
