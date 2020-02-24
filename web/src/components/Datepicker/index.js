import React, { useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);

export default function DatePicker({ name, placeholderText, value, onChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        locale="pt"
        dateFormat="dd/MM/yyyy HH:mm"
        placeholderText={placeholderText}
        showTimeSelect
        timeFormat="HH:mm"
        name={fieldName}
        selected={value}
        onChange={onChange}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = PropTypes.shape({
  name: PropTypes.string.required,
  placeholderText: PropTypes.string,
  value: PropTypes.date,
}).isRequired;

DatePicker.defaultProps = {
  placeholderText: '',
  date: null,
};
