import React, { forwardRef } from 'react';
import { FormInput } from './styles';

function Input({ ...props }, ref) {
  return <FormInput ref={ref} {...props} />;
}

export default forwardRef(Input);
