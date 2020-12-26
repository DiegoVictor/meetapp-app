import styled from 'styled-components/native';

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
})`
  background-color: rgba(0, 0, 0, 0.2);
  border: 0px;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
  line-height: 18px;
  height: 50px;
  margin-bottom: 10px;
  padding: 14px 20px;
  width: 100%;
`;

export const Error = styled.Text`
  align-self: flex-start;
  color: #fb6f91;
  font-weight: bold;
  margin: 0px 0px 20px;
`;
