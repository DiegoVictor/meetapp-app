import { useCallback, useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { addDays, format, parseISO, subDays } from 'date-fns';
import { pt } from 'date-fns/locale/pt';
import { Meetup } from '../../../components/Meetup';
import {
  appendMeetups,
  setMeetups,
  subscribeMeetupRequets,
} from '../../../store/actions/meetup';
import { api } from '../../../services/api';
import { Container, Header, Meetups, Text, SubscribeButton } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);

  const meetups = useSelector((state) => state.meetups);
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

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
          ...data.map((meetup) => ({
            ...meetup,
            start_time: format(parseISO(meetup.date), 'HH:mm', { locale: pt }),
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
          response.data.map((meetup) => ({
            ...meetup,
            start_time: format(parseISO(meetup.date), 'HH:mm', { locale: pt }),
          }))
        )
      );
    })();
  }, [date, dispatch]);

  return (
    <Container
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Header>
        <TouchableOpacity
          onPress={() => setDate(subDays(date, 1))}
          testID="previous"
        >
          <MaterialDesignIcons color="#FFF" name="chevron-left" size={30} />
        </TouchableOpacity>
        <Text>{formattedDate}</Text>
        <TouchableOpacity
          onPress={() => setDate(addDays(date, 1))}
          testID="next"
        >
          <MaterialDesignIcons color="#FFF" name="chevron-right" size={30} />
        </TouchableOpacity>
      </Header>

      <Meetups
        data={meetups}
        keyExtractor={(item) => String(item.id)}
        testID="meetups"
        onEndReachedThreshold={0.2}
        onEndReached={getNextPage}
        renderItem={({ item }) => (
          <Meetup
            data={item}
            tag={{
              text: item.start_time,
              icon: (
                <MaterialDesignIcons
                  color="white"
                  size={17}
                  name="clock-outline"
                  style={{ marginRight: 5, marginTop: 2 }}
                />
              ),
            }}
          >
            <SubscribeButton
              onPress={() => dispatch(subscribeMeetupRequets(item))}
            >
              Inscrever-se
            </SubscribeButton>
          </Meetup>
        )}
      />
    </Container>
  );
};
