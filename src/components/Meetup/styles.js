import styled from 'styled-components/native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';

export const Container = styled.View`
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

export const BannerContainer = styled.View`
  position: relative;
`;

export const Banner = styled.Image`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 150px;
  width: 100%;
`;

export const Tag = styled.View`
  background-color: rgb(244, 63, 94, 0.85);
  border-radius: 16px;
  color: white;
  flex-direction: row;
  left: 10px;
  padding: 5px 10px;
  position: absolute;
  top: 10px;
`;

export const TagText = styled.Text`
  color: white;
  font-weight: 500;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 24px;
  font-weight: bold;
  line-height: 21px;
  padding: 0px 20px;
  margin-top: 20px;
`;

export const Description = styled.Text`
  color: #373b53;
  margin-bottom: 10px;
  padding: 10px 20px;
`;

export const EventDateTime = styled.View`
  align-items: center;
  background-color: #fcf0f2;
  border-radius: 8px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 20px 20px;
  padding: 20px;
`;

export const EventTime = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: row;
  padding-right: 10px;
`;

export const EventDate = styled(EventTime)`
  border-right-width: 2px;
  border-right-color: rgba(212, 64, 89, 0.5);
`;

export const EventDatePart = styled.Text`
  font-size: 18px;
  font-weight: 700;
  line-height: 18px;
  text-transform: uppercase;
`;

export const TimeLabel = styled.Text`
  font-size: 10px;
  text-align: center;
  text-transform: uppercase;
`;

export const Detail = styled.View`
  align-items: center;
  border-top-width: 1px;
  border-top-color: #eee;
  color: #333;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px 20px;
  padding: 10px 0px;
`;

export const DetailIcon = styled.View`
  background-color: #eceaf3;
  border-radius: 8px;
  margin-right: 10px;
  padding: 7px;
`;

export const DetailContent = styled.View``;

export const DetailLabel = styled.Text`
  color: #999;
  font-size: 11px;
`;

export const Text = styled.Text`
  color: #373b53;
  font-size: 13px;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Icon = styled(MaterialDesignIcons)`
  margin-right: 5px;
`;
