import { fireEvent, render } from '@testing-library/react-native';
import { PrimaryButton } from '../../../src/components/PrimaryButton';
import { View } from 'react-native';

describe('PrimaryButton', () => {
  it('should be able to press the button', async () => {
    const onPress = jest.fn();

    const text = 'Button';
    const { getByText } = await render(
      <PrimaryButton onPress={() => onPress()}>{text}</PrimaryButton>
    );

    await fireEvent.press(getByText(text));

    expect(onPress).toHaveBeenCalled();
  });

  it('should set marginLeft for text when left icon is set', async () => {
    const marginLeft = 10;

    const text = 'Button';
    const { getByText } = await render(
      <PrimaryButton leftIcon={<View />} onPress={() => jest.fn()}>
        {text}
      </PrimaryButton>
    );

    const button = getByText(text);

    expect(button.props.style.marginLeft).toBe(marginLeft);
  });
});
