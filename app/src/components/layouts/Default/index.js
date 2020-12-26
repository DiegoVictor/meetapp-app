import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Header } from './styles';
import Logo from '~/assets/logo.png';

export default function Default({ children }) {
  const signed = useSelector(state => state.signed);

  return (
    <Container>
      {signed && (
        <Header>
          <Image source={Logo} style={{ width: 23, height: 24 }} />
        </Header>
      )}
      {children}
    </Container>
  );
}

Default.propTypes = {
  children: PropTypes.element.isRequired,
};
