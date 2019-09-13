import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';
import { updateUserRequest } from '../../../store/actions/user';

export default function Profile() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <Container>
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
          <button type="submit">Atualizar Perfil</button>
        </div>
      </Form>
    </Container>
  );
}
