import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import Logo from '../../../../assets/logo.svg';
import { Box } from '../styles';

import Centralize from '../../../Centralize';

export default function SignIn() {
  return (
    <Centralize>
      <Box>
        <img src={Logo} alt="Meetapp" />
        <Form>
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

          <button type="submit" onClick={() => {}}>
            Entrar
          </button>
        </Form>
        <Link to="/sigup">Criar conta gratuita</Link>
      </Box>
    </Centralize>
  );
}
