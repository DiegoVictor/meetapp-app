import PropTypes from 'prop-types';
import {
  Banner,
  BannerContainer,
  Container,
  Description,
  Detail,
  DetailContent,
  DetailIcon,
  DetailLabel,
  EventDate,
  EventDatePart,
  EventDateTime,
  EventTime,
  Tag,
  TagText,
  Text,
  TimeLabel,
  Title,
} from './styles';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { View } from 'react-native';

export const Meetup = ({ children, data, tag }) => {
  return (
    <Container>
      <BannerContainer>
        <Banner
          source={{ uri: data.banner.url }}
          testID={`banner_` + data.id}
          resizeMode="cover"
        />
        {tag && (
          <Tag>
            {tag.icon}
            <TagText>{tag.text}</TagText>
          </Tag>
        )}
      </BannerContainer>

      <Title>{data.title}</Title>
      <Description>{data.description}</Description>

      {data.full_date && (
        <EventDateTime>
          <EventDate>
            <MaterialDesignIcons name="calendar" size={30} color="#d44059" />
            <View marginLeft={10}>
              <EventDatePart testID={`short_date-${data.id}`}>
                {data.short_date}
              </EventDatePart>
              <TimeLabel testID={`weekday-${data.id}`}>
                {data.weekday}
              </TimeLabel>
            </View>
          </EventDate>

          <EventTime justifyContent="flex-end">
            <MaterialDesignIcons
              name="clock-outline"
              size={32}
              color="#d44059"
            />
            <View marginLeft={10}>
              <EventDatePart testID={`start_time-${data.id}`}>
                {data.start_time}
              </EventDatePart>
              <TimeLabel>Início</TimeLabel>
            </View>
          </EventTime>
        </EventDateTime>
      )}

      <Detail>
        <DetailIcon>
          <MaterialDesignIcons name="map-marker" size={24} color="#373b53" />
        </DetailIcon>
        <DetailContent>
          <Text>
            {data.localization
              .split(/-/)
              .map((s) => s.trim())
              .join('\n')}
          </Text>
        </DetailContent>
      </Detail>

      <Detail>
        <DetailIcon>
          <MaterialDesignIcons name="account" size={24} color="#373b53" />
        </DetailIcon>
        <DetailContent>
          <DetailLabel>Organizador</DetailLabel>
          <Text>{data.organizer.name}</Text>
        </DetailContent>
      </Detail>

      {children}
    </Container>
  );
};

Meetup.propTypes = {
  children: PropTypes.element.isRequired,
  data: PropTypes.shape({
    banner: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    start_time: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    localization: PropTypes.string.isRequired,
    organizer: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
