import styled from 'styled-components/native';
import { TextButton } from '../../../../components/TextButton';
import { PrimaryButton } from '../../../../components/PrimaryButton';
import { SecondaryButton } from '../../../../components/SecondaryButton';

export const Container = styled.View`
  flex: 1;
  padding: 0px 30px;
  margin-top: 30px;
`;

export const ChangePasswordButton = styled(SecondaryButton)`
  margin-top: 10px;
`;

export const SaveButton = styled(PrimaryButton)`
  margin-top: 20px;
  padding: 10px;
`;

export const LogoutButton = styled(TextButton)`
  padding: 10px 10px;
  margin-top: 40px;
`;
