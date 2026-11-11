import styled from 'styled-components/native';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { PrimaryOutlineButton } from '../../../components/PrimaryOutlineButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  padding: 20px 20px;
`;

export const Meetups = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 50,
  },
})`
  margin-top: 10px;
  padding-bottom: 100px;
`;

export const UnsubscribeButton = styled(PrimaryOutlineButton)`
  margin: 10px 20px 0px;
`;

export const Centered = styled(SafeAreaView)`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 0px 40px;
`;

export const ExploreButton = styled(PrimaryButton)`
  margin-top: 40px;
`;
