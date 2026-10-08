import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Background = styled(LinearGradient).attrs({
  colors: ['#22202C', '#402845'],
})`
  flex: 1;
`;

export const Container = styled.View`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  height: 90px;
  justify-content: center;
  padding-top: 20px;
`;
