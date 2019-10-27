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

export default forwardRef(Input);
