import styled from 'styled-components/native';

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
})`
  background-color: rgba(0, 0, 0, 0.2);
  border: 0px;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  line-height: 18px;
  height: 50px;
  margin-bottom: 10px;
  padding: 14px 20px;
  width: 100%;
`;
