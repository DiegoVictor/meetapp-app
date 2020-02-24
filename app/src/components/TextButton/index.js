import React from 'react';
import PropTypes from 'prop-types';

import { Button, Text } from './styles';

export default function TextButton({ children, ...props }) {
  return (
    <Button {...props}>
      <Text>{children}</Text>
    </Button>
  );
}

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
};
