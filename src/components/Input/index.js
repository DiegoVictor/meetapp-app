import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Error, FormInput } from './styles';
import { Text } from 'react-native';

export const Input = forwardRef(({ error, ...props }, ref) => {
  return (
    <>
      <FormInput ref={ref} {...props} />
      <Text>{error && <Error>{error}</Error>}</Text>
    </>
  );
});

Input.propTypes = {
  error: PropTypes.string,
};

Input.defaultProps = {
  error: '',
};
