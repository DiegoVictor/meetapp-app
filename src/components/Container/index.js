import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Logo from '~/assets/logo.png';
import { Background, Header } from './styles';

export default function Container({ children }) {
  const signed = useSelector(state => state.signed);

  return (
    <Background>
      {signed && (
        <Header testID="topbar">
          <Image
            source={Logo}
            style={{ width: 23, height: 24 }}
            testID="logo"
          />
        </Header>
      )}
      {children}
    </Background>
  );
}

Container.propTypes = {
  children: PropTypes.element.isRequired,
};
