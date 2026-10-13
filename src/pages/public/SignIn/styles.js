import styled from 'styled-components/native';
import { TextButton } from '../../../components/TextButton';
import { PrimaryButton } from '../../../components/PrimaryButton';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 0px 30px;
`;

export const SignInButton = styled(PrimaryButton)`
  margin-top: 20px;
`;

export const RegisterButton = styled(TextButton)`
  margin-top: 40px;
`;
