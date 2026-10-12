import styled, { css } from 'styled-components/native';

export const Title = styled.Text`
  color: #f5f3f7;
  font-size: 28px;
  font-weight: 700;
`;

export const Subtitle = styled.Text`
  color: #b8b2be;
  font-size: 16px;
  font-weight: 400;
  ${(props) =>
    props.textAlign &&
    css`
      text-align: ${props.textAlign};
    `}
`;
