import React, { useState, useEffect, useMemo } from 'react';
import { format, parseISO, addDays, subDays } from 'date-fns';
import { ScrollView } from 'react-native';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../../services/api';

import Meetup from '../../Meetup';
import { Container, Header, Text, Meetups } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());

  const formatted_date = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    (async () => {
      const response = await api.get('meetups', {
        params: {
          date: format(date, "yyyy'-'MM'-'dd"),
          page: 1,
        },
      });
      setMeetups(
        response.data.map(meetup => ({
          ...meetup,
          formatted_date: format(
            parseISO(meetup.date),
            "dd 'de' MMMM', às' HH'h'",
            { locale: pt }
          ),
        }))
      );
    })();
  }, [date]);

  return (
    <Container>
      <ScrollView>
        <Header>
          <TouchableOpacity onPress={() => setDate(subDays(date, 1))}>
            <Icon name="chevron-left" size={30} color="#FFF" />
          </TouchableOpacity>
          <Text>{formatted_date}</Text>
          <TouchableOpacity onPress={() => setDate(addDays(date, 1))}>
            <Icon name="chevron-right" size={30} color="#FFF" />
          </TouchableOpacity>
        </Header>

        <Meetups
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup data={item} onSubscribe={id => {}} />
          )}
        />
      </ScrollView>
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
