import { fireEvent, render } from '@testing-library/react-native';
import { TextButton } from '../../../src/components/TextButton';
import { View } from 'react-native';

describe('TextButton', () => {
  it('should be able to presse the button', async () => {
    const onPress = jest.fn();

    const text = 'Button';
    const { getByText } = await render(
      <TextButton onPress={() => onPress()}>{text}</TextButton>
    );

    await fireEvent.press(getByText(text));

    expect(onPress).toHaveBeenCalled();
  });

  it('should set marginLeft for text when left icon is set', async () => {
    const marginLeft = 10;

    const text = 'Button';
    const { getByText } = await render(
      <TextButton leftIcon={<View />} onPress={() => jest.fn()}>
        {text}
      </TextButton>
    );

    const button = getByText(text);

    expect(button.props.style.marginLeft).toBe(marginLeft);
  });
});
