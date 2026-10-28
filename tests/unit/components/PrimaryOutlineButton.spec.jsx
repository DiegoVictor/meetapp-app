import { fireEvent, render } from '@testing-library/react-native';
import { PrimaryOutlineButton } from '../../../src/components/PrimaryOutlineButton';
import { View } from 'react-native';

describe('PrimaryOutlineButton', () => {
  it('should be able to presse the button', async () => {
    const onPress = jest.fn();

    const text = 'Button';
    const { getByText } = await render(
      <PrimaryOutlineButton onPress={() => onPress()}>
        {text}
      </PrimaryOutlineButton>
    );

    await fireEvent.press(getByText(text));

    expect(onPress).toHaveBeenCalled();
  });

  it('should set marginLeft for text when left icon is set', async () => {
    const marginLeft = 10;

    const text = 'Button';
    const { getByText } = await render(
      <PrimaryOutlineButton leftIcon={<View />} onPress={() => jest.fn()}>
        {text}
      </PrimaryOutlineButton>
    );

    const button = getByText(text);

    expect(button.props.style.marginLeft).toBe(marginLeft);
  });
});
