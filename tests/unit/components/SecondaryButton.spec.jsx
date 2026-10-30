import { fireEvent, render } from '@testing-library/react-native';
import { SecondaryButton } from '../../../src/components/SecondaryButton';
import { View } from 'react-native';

describe('SecondaryButton', () => {
  it('should be able to presse the button', async () => {
    const onPress = jest.fn();

    const text = 'Button';
    const { getByText } = await render(
      <SecondaryButton onPress={() => onPress()}>{text}</SecondaryButton>
    );

    await fireEvent.press(getByText(text));

    expect(onPress).toHaveBeenCalled();
  });

  it('should set marginLeft for text when left icon is set', async () => {
    const marginLeft = 20;

    const text = 'Button';
    const { getByText } = await render(
      <SecondaryButton leftIcon={<View />} onPress={() => jest.fn()}>
        {text}
      </SecondaryButton>
    );

    const button = getByText(text);

    expect(button.props.style.marginLeft).toBe(marginLeft);
  });
});
