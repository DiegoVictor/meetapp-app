import React from 'react';
import PropTypes from 'prop-types';
import { MdExitToApp } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/actions/user';
import { Container, Header } from './styles';
import Logo from '~/assets/logo.svg';

export default function Default({ children }) {
  const dispatch = useDispatch();
  const signed = useSelector(state => state.signed);
  const user = useSelector(state => state.user);

  return (
    <Container>
      {signed && (
        <Header>
          <div>
            <Link to="/dashboard" data-testid="dashboard">
              <img src={Logo} alt="Meetapp" />
            </Link>

            <aside>
              <div>
                <strong>{user.name}</strong>
                <Link to="/profile">Meu Perfil</Link>
              </div>
              <button type="button" onClick={() => dispatch(signOut())}>
                <MdExitToApp size="15" />
                Sair
              </button>
            </aside>
          </div>
        </Header>
      )}
      {children}
    </Container>
  );
}

Default.propTypes = {
  children: PropTypes.element.isRequired,
};
