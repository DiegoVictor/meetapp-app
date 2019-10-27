import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api';

import { setSubscriptions } from '~/store/actions/subscription';
import { unsubscribeMeetupRequest } from '~/store/actions/meetup';
import { Container, Meetups } from './styles';
import api from '~/services/api';
import Button from '~/components/Button';
import Meetup from '~/components/Meetup';

export default function Subscription() {
  const subscriptions = useSelector(state => state.subscriptions);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await api.get('subscriptions');
      dispatch(
        SetSubscriptions(
          response.data.map(subscription => ({
            ...subscription,
            formatted_date: format(
              parseISO(subscription.date),
              "dd 'de' MMMM', às' HH'h'",
              { locale: pt }
            ),
          }))
        )
      );
    })();
  }, [dispatch]);

  return (
    <Container>
      <Meetups
        data={subscriptions}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Meetup data={item}>
            <Button onPress={() => dispatch(UnsubscribeMeetupRequest(item))}>
              Cancelar inscrição
            </Button>
          </Meetup>
        )}
      />
    </Container>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
