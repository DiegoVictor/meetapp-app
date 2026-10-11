import { useRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { BorderedTextInput } from '../../../src/components/BorderedTextInput';

describe('BorderedTextInput', () => {
  it('should be able to change input value', async () => {
    const Form = ({ onChangeText, initialValue }) => {
      const ref = useRef(null);
      const [value, setValue] = useState(initialValue);

      return (
        <BorderedTextInput
          testID="input"
          ref={ref}
          value={value}
          label="Label"
          onChangeText={(text) => {
            setValue(text);
            onChangeText(text);
          }}
        />
      );
    };

    const change = jest.fn();
    const { getByTestId, getByText } = await render(
      <Form onChangeText={change} />
    );

    const word = faker.lorem.word();
    await fireEvent.changeText(getByTestId('input'), word);

    expect(change).toHaveBeenCalledWith(word);

    expect(getByTestId('input').props.value).toBe(word);
    expect(getByText('Label'));
  });

  it('should be able to render a large input', async () => {
    const Form = ({ onChangeText, initialValue }) => {
      const ref = useRef(null);
      const [value, setValue] = useState(initialValue);

      return (
        <BorderedTextInput
          testID="input"
          ref={ref}
          value={value}
          size="lg"
          onChangeText={(text) => {
            setValue(text);
            onChangeText(text);
          }}
        />
      );
    };

    const change = jest.fn();
    const { getByTestId } = await render(<Form onChangeText={change} />);

    expect(getByTestId('input-container').props.style).toMatchObject({
      paddingTop: 15,
      paddingRight: 15,
      paddingBottom: 15,
      paddingLeft: 15,
    });
  });

  it('should be able to change input content visibility', async () => {
    const Form = ({ onChangeText, initialValue }) => {
      const ref = useRef(null);
      const [value, setValue] = useState(initialValue);

      return (
        <BorderedTextInput
          testID="input"
          ref={ref}
          value={value}
          onChangeText={(text) => {
            setValue(text);
            onChangeText(text);
          }}
          secureTextEntry
        />
      );
    };

    const change = jest.fn();
    const { getByTestId } = await render(<Form onChangeText={change} />);

    const input = getByTestId('input');
    expect(input.props.secureTextEntry).toBeTruthy();

    await fireEvent.press(getByTestId('secure-text'));

    expect(input.props.secureTextEntry).toBeFalsy();
  });

  it('should be able to see an error message', async () => {
    const error = faker.lorem.sentence();

    const Form = ({ onChangeText, initialValue }) => {
      const [value, setValue] = useState(initialValue);

      return (
        <BorderedTextInput
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
