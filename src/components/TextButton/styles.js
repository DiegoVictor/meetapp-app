import styled, { css } from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const Text = styled.Text`
  color: #f43f5e;
  font-size: 16px;
  font-weight: 600;
  ${(props) =>
    props.marginLeft &&
    css`
      margin-left: 10px;
    `}
`;
