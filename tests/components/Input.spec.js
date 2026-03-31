import React, { useRef, useState } from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import faker from 'faker';

import Input from '~/components/Input';

describe('Input', () => {
  it('should be able to change input value', async () => {
    const Wrapper = ({ onChangeText, initialValue }) => {
      const ref = useRef(null);
      const [value, setValue] = useState(initialValue);

      return (
        <Input
          testID="input"
          ref={ref}
          value={value}
          onChangeText={text => {
            setValue(text);
            onChangeText(text);
          }}
        />
      );
    };

    const change = jest.fn();
    const { getByTestId } = render(<Wrapper onChangeText={change} value="" />);

    const word = faker.random.word();
    fireEvent.changeText(getByTestId('input'), word);

    expect(change).toHaveBeenCalledWith(word);
    expect(getByTestId('input').props.value).toBe(word);
  });

  it('should be able to see an error message', async () => {
    const error = faker.lorem.sentence();
    const Wrapper = ({ onChangeText, initialValue }) => {
      const ref = useRef(null);
      const [value, setValue] = useState(initialValue);

      return (
        <Input
          error={error}
          testID="input"
          ref={ref}
          value={value}
          onChangeText={text => {
            setValue(text);
            onChangeText(text);
          }}
        />
      );
    };

    const { getByText } = render(<Wrapper onChangeText={jest.fn()} value="" />);

    expect(getByText(error)).toBeTruthy();
  });
});
