import React, { forwardRef } from 'react';
import { FormInput, Error } from './styles';

function Input({ error, ...props }, ref) {
  return (
    <>
      <FormInput ref={ref} {...props} />
      {error && <Error>{error}</Error>}
    </>
  );
}

export default forwardRef(Input);
