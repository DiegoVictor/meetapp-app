import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import Container from '~/components/Container';

jest.mock('react-redux');

describe('Container', () => {
  it('should be able to see topbar when logged in', async () => {
    useSelector.mockImplementation(cb => {
      return cb({ signed: true });
    });

    const { getByTestId } = render(
      <Container>
        <View />
      </Container>
    );

    expect(getByTestId('topbar')).toBeTruthy();
    expect(getByTestId('logo')).toBeTruthy();
  });
});
