import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Logo from '../../../../assets/logo.svg';
import { Box } from '../styles';

import Centralize from '../../../Centralize';
import { SignUpRequest } from '../../../../store/actions/user';

const schema = Yup.object().shape({
  name: Yup.string().required('O campo nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  return (
    <Centralize>
      <Box>
        <img src={Logo} alt="Meetapp" />
        <Form
          schema={schema}
          onSubmit={({ name, email, password }) =>
            dispatch(SignUpRequest(name, email, password))
          }
        >
          <Input name="name" type="text" placeholder="Nome completo" />
          <Input
            name="email"
            type="email"
            placeholder="Digite seu melhor email"
          />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />

          <button type="submit">Cadastrar</button>
        </Form>
        <Link to="/">Já tenho conta</Link>
      </Box>
    </Centralize>
  );
}
