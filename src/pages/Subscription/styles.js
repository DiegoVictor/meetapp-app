import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 20px;
`;

export const Meetups = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
