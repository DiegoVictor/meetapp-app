import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Button = styled(TouchableOpacity)`
  align-items: center;
  border-color: rgba(212, 64, 89, 0.65);
  border-width: 2px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  padding: 12px 20px;
`;

export const Text = styled.Text`
  color: rgba(212, 64, 89, 0.65);
  font-weight: bold;
  ${(props) =>
    props.marginLeft &&
    css`
      margin-left: 10px;
    `}
`;
