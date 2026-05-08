import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PublicRoutes } from './public.routes';
import { PrivateRoutes } from './private.routes';

const ref = createNavigationContainerRef();
export function navigate(name, params) {
  if (ref.isReady()) {
    ref.navigate(name, params);
  }
}

export const AppRoutes = () => {
  const signed = useSelector((state) => state.signed);

  return (
    <NavigationContainer ref={ref}>
      {signed ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};
