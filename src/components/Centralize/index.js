import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Centralize({ children }) {
  return <Container>{children}</Container>;
}

Centralize.propTypes = {
  children: PropTypes.element.isRequired,
};
