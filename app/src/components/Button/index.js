import React from 'react';
import PropTypes from 'prop-types';

import { Btn, Text } from './styles';

export default function Button({ children, ...props }) {
  return (
    <Btn {...props}>
      <Text>{children}</Text>
    </Btn>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};
