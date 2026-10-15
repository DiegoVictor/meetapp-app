import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  border-color: #44364d;
  border-width: 1px;
  border-radius: 8px;
  flex-direction: row;
  margin-top: 10px;
  padding: 8px 10px 8px 15px;
  width: 100%;

  ${(props) => {
    if (props.size === 'lg') {
      return css`
        padding: 15px;
      `;
    }
  }}
`;

export const InputGroup = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const Label = styled.Text`
  color: white;
  font-size: 12px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.25)',
})`
  color: #fff;
  font-size: 18px;
  line-height: 18px;
  padding: 7px 8px 5px 0px;
`;

export const Error = styled.Text`
  color: #fb6f91;
  margin-bottom: 10px;
  margin-top: 5px;
`;
