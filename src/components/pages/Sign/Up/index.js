import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/logo.svg';
import { Box } from '../styles';

import Centralize from '../../../Centralize';

export default function SignUp() {
  return (
    <Centralize>
      <Box>
        <img src={Logo} alt="Meetapp" />
        <Form>
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

          <button type="submit" onClick={() => {}}>
            Cadastrar
          </button>
        </Form>
        <Link to="/sigin">Já tenho conta</Link>
      </Box>
    </Centralize>
  );
}
