import { useSelector } from 'react-redux';
import {
  createNavigationContainerRef,
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';
import { PublicRoutes } from './public.routes';
import { PrivateRoutes } from './private.routes';

const ref = createNavigationContainerRef();
export function navigate(name, params) {
  if (ref.isReady()) {
    ref.navigate(name, params);
  }
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export const Navigation = () => {
  const signed = useSelector((state) => state.signed);

  return (
    <NavigationContainer ref={ref} theme={theme}>
      {signed ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};
