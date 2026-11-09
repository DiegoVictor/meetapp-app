import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale/pt';
import { Subscription } from '../../../src/pages/private/Subscription';
import { factory } from '../../utils/factory';
import { setSubscriptions } from '../../../src/store/actions/subscription';
import { unsubscribeMeetupRequest } from '../../../src/store/actions/meetup';

jest.mock('react-redux');

const mockNavigate = jest.fn((args) => args);
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: (args) => mockNavigate(args),
    }),
  };
});

const mockUseSafeAreaInsets = jest.fn((args) => args);
jest.mock('react-native-safe-area-context', () => {
  return {
    ...jest.requireActual('react-native-safe-area-context'),
    useSafeAreaInsets: () => mockUseSafeAreaInsets(),
  };
});

const mockApiGet = jest.fn();
jest.mock('../../../src/services/api', () => {
  return {
    api: {
      get: (...args) => mockApiGet(...args),
    },
  };
});

describe('Subscription', () => {
  beforeAll(() => {
    mockUseSafeAreaInsets.mockReturnValue({ top: 0, bottom: 0 });
  });

  it('should be able to load subcriptions', async () => {
    const subscriptions = await factory.attrsMany('Subscription', 3);

    useSelector.mockReturnValueOnce({ subscriptions: [] });
    mockApiGet.mockResolvedValueOnce({ data: subscriptions });

    const dispatch = jest.fn();
    useDispatch.mockReturnValueOnce(dispatch);

    await render(<Subscription />);

    await waitFor(() => expect(dispatch).toHaveBeenCalled());

    const options = { locale: pt };
    expect(dispatch).toHaveBeenCalledWith(
      setSubscriptions(
        subscriptions.map((subscription) => ({
          ...subscription,
          full_date: true,
          start_time: format(subscription.date, 'HH:mm', options),
          short_date: format(subscription.date, 'dd MMM', options),
          weekday: format(subscription.date, 'EEEE', options),
        }))
      )
    );
  });

  it('should be able to load subcriptions from redux', async () => {
    const subscriptions = await factory.attrsMany('Subscription', 3);

    mockApiGet.mockResolvedValueOnce({ data: subscriptions });

    const options = { locale: pt };
    const subscriptionsSerialized = setSubscriptions(
      subscriptions.map((subscription) => ({
        ...subscription,
        full_date: true,
        start_time: format(subscription.date, 'HH:mm', options),
        short_date: format(subscription.date, 'dd MMM', options),
        weekday: format(subscription.date, 'EEEE', options),
      }))
    ).payload;

    useSelector.mockImplementationOnce((cb) => {
      return cb({ subscriptions: subscriptionsSerialized });
    });

    const dispatch = jest.fn();
    useDispatch.mockReturnValueOnce(dispatch);

    const { getByText, getByTestId } = await render(<Subscription />);

    subscriptionsSerialized.forEach((subscription) => {
      expect(getByText(subscription.title)).toBeTruthy();
      expect(getByTestId(`banner_${subscription.id}`).props).toHaveProperty(
        'source',
        { uri: subscription.banner.url }
      );
      expect(getByText(subscription.localization)).toBeTruthy();

      expect(getByTestId(`start_time-${subscription.id}`)).toHaveTextContent(
        subscription.start_time
      );
      expect(getByTestId(`short_date-${subscription.id}`)).toHaveTextContent(
        subscription.short_date
      );
      expect(getByTestId(`weekday-${subscription.id}`)).toHaveTextContent(
        subscription.weekday
      );

      expect(getByText(subscription.organizer.name)).toBeTruthy();
    });
  });

  it('should be able to cancel one subcription', async () => {
    const subscription = await factory.attrs('Subscription');

    mockApiGet.mockResolvedValueOnce({ data: [subscription] });

    const subscriptionsSerialized = setSubscriptions({
      ...subscription,
      formatted_date: format(
        parseISO(subscription.date),
        "dd 'de' MMMM', às' HH'h'",
        { locale: pt }
      ),
    }).payload;

    useSelector.mockImplementationOnce((cb) => {
      return cb({ subscriptions: [subscriptionsSerialized] });
    });

    const dispatch = jest.fn();
    useDispatch.mockReturnValueOnce(dispatch);

    const { getByText, getByTestId } = await render(<Subscription />);

    await waitFor(() => getByText('Cancelar inscrição'));

    fireEvent.press(getByTestId(`meetup_` + subscription.id));

    expect(dispatch).toHaveBeenCalledWith(
      unsubscribeMeetupRequest(subscriptionsSerialized)
    );
  });

  it('should be able to navigate to dashboard when there is no subscriptions', async () => {
    mockApiGet.mockResolvedValueOnce({ data: [] });
    useSelector.mockImplementationOnce((cb) => {
      return cb({ subscriptions: [] });
    });

    const dispatch = jest.fn();
    useDispatch.mockReturnValueOnce(dispatch);

    const { getByText } = await render(<Subscription />);

    await waitFor(() =>
      getByText('Você ainda não se inscreveu em nenhum meetup.')
    );

    await fireEvent.press(getByText('Explorar meetups'));

    expect(dispatch).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('Dashboard');
  });
});
