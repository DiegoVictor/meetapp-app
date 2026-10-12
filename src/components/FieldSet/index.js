import styled from 'styled-components/native';

export const FieldSet = styled.View`
  margin-top: ${(props) => (props.marginTop ? `${props.marginTop}px` : '30px')};
`;

export const Legend = styled.Text`
  color: #e8e3eb;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;
