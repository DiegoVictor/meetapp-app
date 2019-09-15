import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Banner,
  Description,
  Title,
  Item,
  Subscribe,
  Icon,
  Text,
} from './styles';

export default function Meetup({ data, onSubscribe }) {
  return (
    <Container>
      <Banner source={{ uri: data.banner.url }} resizeMode="cover" />

      <Title>{data.title}</Title>
      <Description>
        <Item>
          <Icon name="event" size={17} color="#999" />
          <Text>{data.formatted_date}</Text>
        </Item>

        <Item>
          <Icon name="place" size={17} color="#999" />
          <Text>{data.localization}</Text>
        </Item>

        <Item>
          <Icon name="person" size={17} color="#999" />
          <Text>Organizador: {data.organizer.name}</Text>
        </Item>

        <Subscribe onPress={() => onSubscribe(data.id)}>
          Realizar inscrição
        </Subscribe>
      </Description>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    formatted_date: PropTypes.string.isRequired,
    localization: PropTypes.string.isRequired,
    banner: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    organizer: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onSubscribe: PropTypes.func.isRequired,
};
