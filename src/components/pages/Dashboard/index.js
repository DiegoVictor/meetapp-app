import React, { useEffect, useMemo, useState } from 'react';
import { addDays, format, parseISO, subDays } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import pt from 'date-fns/locale/pt';

import { Container, Header, Meetups, Text } from './styles';
import {
  appendMeetups,
  setMeetups,
  subscribeMeetupRequets,
} from '~/store/actions/meetup';
import api from '~/services/api';
import Button from '~/components/Button';
import Meetup from '~/components/Meetup';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetups);
  const [page, setPage] = useState(1);

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
      dispatch(
        setMeetups(
          response.data.map(meetup => ({
            ...meetup,
            formatted_date: format(
              parseISO(meetup.date),
              "dd 'de' MMMM', às' HH'h'",
              { locale: pt }
            ),
          }))
        )
      );
    })();
  }, [date, dispatch]);

  return (
    <Container>
      <Header>
        <TouchableOpacity onPress={() => setDate(subDays(date, 1))}>
          <Icon color="#FFF" name="chevron-left" size={30} />
        </TouchableOpacity>
        <Text>{formatted_date}</Text>
        <TouchableOpacity onPress={() => setDate(addDays(date, 1))}>
          <Icon color="#FFF" name="chevron-right" size={30} />
        </TouchableOpacity>
      </Header>

      <Meetups
        data={meetups}
        keyExtractor={item => String(item.id)}
        onEndReachedThreshold={0.2}
        onEndReached={async () => {
          const next_page = page + 1;
          const response = await api.get('meetups', {
            params: {
              date: format(date, "yyyy'-'MM'-'dd"),
              page: next_page,
            },
          });

          if (response.data.length === 10) {
            setPage(next_page);
            appendMeetups([
              ...meetups,
              ...response.data.map(meetup => ({
                ...meetup,
                formatted_date: format(
                  parseISO(meetup.date),
                  "dd 'de' MMMM', às' HH'h'",
                  { locale: pt }
                ),
              })),
            ]);
          }
        }}
        renderItem={({ item }) => (
          <Meetup data={item}>
            <Button onPress={() => dispatch(subscribeMeetupRequets(item))}>
              Realizar Inscrição
            </Button>
          </Meetup>
        )}
      />
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
