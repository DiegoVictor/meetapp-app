import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { MdSave, MdArrowBack } from 'react-icons/md';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Container } from './styles';
import { updateUserRequest } from '../../../store/actions/user';

// Test if is empty or have the minimun length required
Yup.addMethod(Yup.string, 'emptyMin', function(min, message) {
  return this.test('empty_or_min', message, value => {
    if (value.length > 0 && value.length < min) {
      return false;
    }
    return true;
  });
});

const schema = Yup.object().shape(
  {
    confirm_password: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required()
            .oneOf(
              [Yup.ref('password')],
              'A confirmação da senha parece diferente da senha nova'
            )
        : field
    ),
    email: Yup.string().email('Informe um email válido'),
    name: Yup.string(),
    old_password: Yup.string()
      .emptyMin(
        6,
        'A sua senha atual parece meio curta, deveria ter no mínimo 6 caracteres'
      )
      .when('password', (password, field) =>
        password ? field.required('Digite a senha atual') : field
      ),
    password: Yup.string()
      .emptyMin(6, 'A nova senha deve conter no mínimo 6 caracteres')
      .when('old_password', (old_password, field) =>
        old_password ? field.required('Informe a nova senha') : field
      ),
  },
  ['password', 'old_password']
);

export default function Profile({ history }) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <Container>
      <div>
        <button
          type="button"
          className="unstyled"
          onClick={() => history.goBack()}
        >
          <MdArrowBack color="#FFF" size="24" />
        </button>
      </div>
      <Form
        schema={schema}
        initialData={user}
        onSubmit={data => {
          dispatch(updateUserRequest(data));
        }}
      >
        <Input name="name" type="text" placeholder="Nome completo" />
        <Input
          name="email"
          type="email"
          placeholder="Digite seu melhor email"
        />

        <hr />
        <Input name="old_password" type="password" placeholder="Senha atual" />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirme de senha"
        />

        <div>
          <button type="submit">
            <MdSave size="17" />
            Salvar Perfil
          </button>
        </div>
      </Form>
    </Container>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
