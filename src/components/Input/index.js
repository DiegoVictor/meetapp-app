import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Error, FormInput } from './styles';

function Input({ error, ...props }, ref) {
  return (
    <>
      <FormInput ref={ref} {...props} />
      {error && <Error>{error}</Error>}
    </>
  );
}

Input.propTypes = {
  error: PropTypes.string,
};

Input.defaultProps = {
  error: '',
};

export default forwardRef(Input);
