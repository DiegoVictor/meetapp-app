import React, { useRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import Input from '../../../src/components/Input';

describe('Input', () => {
  it('should be able to change input value', async () => {
    const Form = ({ onChangeText, initialValue }) => {
      const ref = useRef(null);
      const [value, setValue] = useState(initialValue);

      return (
        <Input
          testID="input"
          ref={ref}
          value={value}
          onChangeText={(text) => {
            setValue(text);
            onChangeText(text);
          }}
        />
      );
    };

    const change = jest.fn();
    const { getByTestId } = await render(
      <Form onChangeText={change} value="" />
    );

    const word = faker.lorem.word();
    fireEvent.changeText(getByTestId('input'), word);

    expect(change).toHaveBeenCalledWith(word);
    expect(getByTestId('input').props.value).toBe(word);
  });

  it('should be able to see an error message', async () => {
    const error = faker.lorem.sentence();

    const Form = ({ onChangeText, initialValue }) => {
      const [value, setValue] = useState(initialValue);

      return (
        <Input
          error={error}
          value={value}
          onChangeText={(text) => {
            setValue(text);
            onChangeText(text);
          }}
        />
      );
    };

    await render(<Form onChangeText={jest.fn()} initialValue="" />);

    expect(screen.getByText(error)).toBeOnTheScreen();
  });
});
