import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Button = styled(TouchableOpacity)`
  align-items: center;
  background-color: #d44059;
  border: 0px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  padding: 12px 20px;
  width: 100%;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  ${(props) =>
    props.marginLeft &&
    css`
      margin-left: 10px;
    `}
`;
