import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient).attrs({
  colors: ['#22202C', '#402845'],
})`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  height: 64px;
  justify-content: center;
`;
