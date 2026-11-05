import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { PrimaryButton } from '../../../../components/PrimaryButton';

export const Container = styled.View`
  flex: 1;
  padding: 0px 30px;
  margin-top: 30px;
`;

export const BackButton = styled(TouchableOpacity)`
  margin-bottom: 10px;
`;

export const SaveButton = styled(PrimaryButton)`
  margin-top: 40px;
`;
