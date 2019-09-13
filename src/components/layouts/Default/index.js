import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header } from './styles';
import Logo from '../../../assets/logo.svg';

export default function Default({ children }) {
  const signed = useSelector(state => state.signed);

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
                {/* <strong>{user.name}</strong> */}
                <strong>Diego Victor</strong>
                <Link to="/profile">Meu Perfil</Link>
              </div>
              <button type="button" onClick={() => {}}>
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
