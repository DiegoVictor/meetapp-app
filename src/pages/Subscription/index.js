import React, { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import pt from 'date-fns/locale/pt';

import Button from '~/components/Button';
import Meetup from '~/components/Meetup';
import api from '~/services/api';
import { setSubscriptions } from '~/store/actions/subscription';
import { unsubscribeMeetupRequest } from '~/store/actions/meetup';
import { Container, Meetups } from './styles';

export const Subscription = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector(state => state.subscriptions);

  useEffect(() => {
    (async () => {
      const response = await api.get('subscriptions');
      dispatch(
        setSubscriptions(
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
            <Button
              onPress={() => dispatch(unsubscribeMeetupRequest(item))}
              testID={`meetup_` + item.id}
            >
              Cancelar inscrição
            </Button>
          </Meetup>
        )}
      />
    </Container>
  );
};
