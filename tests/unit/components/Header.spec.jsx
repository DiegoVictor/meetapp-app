import { render } from '@testing-library/react-native';
import { Header } from '../../../src/components/Header';
import { Text } from 'react-native';

const mockUseSelector = jest.fn();
jest.mock('react-redux', () => {
  return {
    useSelector: (cb) => mockUseSelector(cb),
  };
});

describe('Header', () => {
  it('should be able to render children', async () => {
    mockUseSelector.mockImplementationOnce((cb) => cb({ signed: true }));

    const text = 'Lorem Ipsum';
    const { getByText } = await render(
      <Header>
        <Text>{text}</Text>
      </Header>
    );

    expect(getByText(text)).toBeTruthy();
  });

  it('should be able to render children even when not signed in', async () => {
    mockUseSelector.mockImplementationOnce((cb) => cb({ signed: false }));

    const text = 'Lorem Ipsum';
    const { getByText } = await render(
      <Header>
        <Text>{text}</Text>
      </Header>
    );

    expect(getByText(text)).toBeTruthy();
  });
});
