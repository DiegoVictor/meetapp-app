import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Logo from '../../../../assets/logo.svg';
import { Box } from '../styles';

import Centralize from '../../../Centralize';
import { SignInRequest } from '../../../../store/actions/user';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <Centralize>
      <Box>
        <img src={Logo} alt="Meetapp" />
        <Form
          shcema={schema}
          onSubmit={() => dispatch(SignInRequest(email, password))}
        >
          <Input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Digite seu melhor email"
          />
          <Input
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Sua senha secreta"
          />

          <button type="submit">Entrar</button>
        </Form>
        <Link to="/sigup">Criar conta gratuita</Link>
      </Box>
    </Centralize>
  );
}
