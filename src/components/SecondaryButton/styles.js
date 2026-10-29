import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Button = styled(TouchableOpacity)`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border: 0px;
  border-radius: 8px;
  flex-direction: row;
  padding: 15px 18px;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: left;
  ${(props) =>
    props.marginLeft &&
    css`
      margin-left: 20px;
    `}
`;
