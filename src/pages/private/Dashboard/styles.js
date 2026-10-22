import styled from 'styled-components/native';
import { PrimaryButton } from '../../../components/PrimaryButton';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 20px;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin: 15px 0px;
  text-align: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 20px;
  line-height: 23px;
  margin: 0px 15px;
  text-align: center;
`;

export const Meetups = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 100,
  },
})``;

export const SubscribeButton = styled(PrimaryButton)`
  margin: 10px 20px 0px;
  width: auto;
`;
