import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Box } from '../styles';
import Centralize from '~/components/Centralize';
import Logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Centralize>
      <Box>
        <img src={Logo} alt="Meetapp" />
        <Form
          schema={schema}
          onSubmit={() => dispatch(signInRequest(email, password))}
        >
          <Input
            name="email"
            placeholder="Digite seu e-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            name="password"
            placeholder="Sua senha secreta"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </Form>
        <Link to="/signup">Criar conta gratuita</Link>
      </Box>
    </Centralize>
  );
}
