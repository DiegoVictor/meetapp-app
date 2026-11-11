import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale/pt';
import { Meetup } from '../../../components/Meetup';
import { Title, Subtitle } from '../../../components/Title';
import { setSubscriptions } from '../../../store/actions/subscription';
import { unsubscribeMeetupRequest } from '../../../store/actions/meetup';
import { api } from '../../../services/api';
import {
  Container,
  ExploreButton,
  Meetups,
  Centered,
  UnsubscribeButton,
} from './styles';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Subscription = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions);
  const { navigate } = useNavigation();

  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      const response = await api.get('subscriptions');

      if (Array.isArray(response.data) && response.data.length > 0) {
        dispatch(
          setSubscriptions(
            response.data.map((subscription) => {
              const date = parseISO(subscription.date);
              const options = {
                locale: pt,
              };

              return {
                ...subscription,
                full_date: true,
                start_time: format(date, 'HH:mm', options),
                short_date: format(date, 'dd MMM', options),
                weekday: format(date, 'EEEE', options),
              };
            })
          )
        );
      }
    })();
  }, [dispatch]);

  if (subscriptions.length > 0) {
    return (
      <Container
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <Title marginTop={20}>Inscrições</Title>
        <Subtitle>Acompanhe os meetups em que você está inscrito</Subtitle>

        <Meetups
          data={subscriptions}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              data={item}
              tag={{
                text: `Inscrito`,
                icon: (
                  <MaterialDesignIcons
                    color="white"
                    size={17}
                    name="check-circle-outline"
                    style={{ marginRight: 5, marginTop: 2 }}
                  />
                ),
              }}
            >
              <UnsubscribeButton
                onPress={() => dispatch(unsubscribeMeetupRequest(item))}
                testID={`meetup_` + item.id}
              >
                Cancelar inscrição
              </UnsubscribeButton>
            </Meetup>
          )}
        />
      </Container>
    );
  }

  return (
    <Centered style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Ionicons
        name="ticket-outline"
        size={72}
        color="#9b88a4"
        style={{ marginBottom: 20 }}
      />

      <Title>Nenhuma inscrição</Title>
      <Subtitle textAlign="center">
        Você ainda não se inscreveu em nenhum meetup.
      </Subtitle>

      <ExploreButton
        onPress={() => {
          navigate('Dashboard');
        }}
        leftIcon={
          <MaterialDesignIcons name="compass-outline" color="white" size={24} />
        }
      >
        Explorar meetups
      </ExploreButton>
    </Centered>
  );
};
