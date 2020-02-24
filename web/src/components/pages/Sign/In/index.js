import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/actions/user';
import { Box } from '../styles';
import Centralize from '~/components/Centralize';
import Logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default () => {
  const dispatch = useDispatch();

  return (
    <Centralize>
      <Box>
        <img src={Logo} alt="Meetapp" />
        <Form
          schema={schema}
          onSubmit={({ email, password }) =>
            dispatch(signInRequest(email, password))
          }
        >
          <Input name="email" placeholder="Digite seu e-mail" type="email" />
          <Input
            name="password"
            placeholder="Sua senha secreta"
            type="password"
          />

          <button type="submit">Entrar</button>
        </Form>
        <Link to="/signup">Criar conta gratuita</Link>
      </Box>
    </Centralize>
  );
};
