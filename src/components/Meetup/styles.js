import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Button from '../Button';

export const Container = styled.View`
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

export const Banner = styled.Image`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 150px;
  width: 100%;
`;

export const Description = styled.View`
  padding: 0px 20px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  margin: 20px 20px 10px;
`;

export const Subscribe = styled(Button)`
  margin-top: 15px;
`;

export const Item = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  color: #999;
  font-size: 13px;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Icon = styled(MaterialIcon)`
  margin-right: 5px;
`;
