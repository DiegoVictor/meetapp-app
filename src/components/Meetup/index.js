import React from 'react';
import PropTypes from 'prop-types';

import {
  Banner,
  Container,
  Description,
  Icon,
  Item,
  Text,
  Title,
} from './styles';

export default function Meetup({ children, data }) {
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

        {children}
      </Description>
    </Container>
  );
}

Meetup.propTypes = {
  children: PropTypes.element.isRequired,
  data: PropTypes.shape({
    banner: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    formatted_date: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    localization: PropTypes.string.isRequired,
    organizer: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
