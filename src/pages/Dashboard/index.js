import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { addDays, format, parseISO, subDays } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import pt from 'date-fns/locale/pt';

import Button from '~/components/Button';
import Meetup from '~/components/Meetup';
import api from '~/services/api';
import {
  appendMeetups,
  setMeetups,
  subscribeMeetupRequets,
} from '~/store/actions/meetup';
import { Container, Header, Meetups, Text } from './styles';

export default () => {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const meetups = useSelector(state => state.meetups);
  const [page, setPage] = useState(1);

  const formattedDate = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date]
  );

  const getNextPage = useCallback(async () => {
    const nextPage = page + 1;

    const { data } = await api.get('meetups', {
      params: {
        date: format(date, "yyyy'-'MM'-'dd"),
        page: nextPage,
      },
    });

    if (data.length > 0) {
      dispatch(
        appendMeetups([
          ...meetups,
          ...data.map(meetup => ({
            ...meetup,
            formatted_date: format(
              parseISO(meetup.date),
              "dd 'de' MMMM', às' HH'h'",
              { locale: pt }
            ),
          })),
        ])
      );
      setPage(nextPage);
    }
  }, [date, page, meetups]);

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
        <TouchableOpacity
          onPress={() => setDate(subDays(date, 1))}
          testID="previous"
        >
          <Icon color="#FFF" name="chevron-left" size={30} />
        </TouchableOpacity>
        <Text>{formattedDate}</Text>
        <TouchableOpacity
          onPress={() => setDate(addDays(date, 1))}
          testID="next"
        >
          <Icon color="#FFF" name="chevron-right" size={30} />
        </TouchableOpacity>
      </Header>

      <Meetups
        data={meetups}
        keyExtractor={item => String(item.id)}
        testID="meetups"
        onEndReachedThreshold={0.2}
        onEndReached={getNextPage}
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
};
