import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdExitToApp } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, Header } from './styles';
import Logo from '../../../assets/logo.svg';
import { SignOut } from '../../../store/actions/user';

export default function Default({ children }) {
  const signed = useSelector(state => state.signed);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <Container>
      {signed && (
        <Header>
          <div>
            <Link to="/dashboard">
              <img src={Logo} alt="Meetapp" />
            </Link>

            <aside>
              <div>
                <strong>{user.name}</strong>
                <Link to="/profile">Meu Perfil</Link>
              </div>
              <button type="button" onClick={() => dispatch(SignOut())}>
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
