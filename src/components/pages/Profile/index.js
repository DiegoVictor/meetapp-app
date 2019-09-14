import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { MdSave, MdArrowBack } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container } from './styles';
import { updateUserRequest } from '../../../store/actions/user';

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
        <Input
          name="old_password"
          type="password"
          placeholder="Sua senha autal"
        />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirme sua nova senha"
        />

        <div>
          <button type="submit">
            <MdSave size="17" />
            Atualizar Perfil
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
