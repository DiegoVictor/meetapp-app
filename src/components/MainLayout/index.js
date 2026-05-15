import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Background, Header } from './styles';
import Logo from '~/assets/logo.png';

export const MainLayout = ({ children }) => {
  const signed = useSelector((state) => state.signed);

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
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
