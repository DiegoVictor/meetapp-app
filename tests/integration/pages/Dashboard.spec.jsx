import {
  fireEvent,
  render,
  waitFor,
  screen,
} from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import { pt } from 'date-fns/locale/pt';
import { addDays, format, parseISO, subDays } from 'date-fns';
import { Dashboard } from '../../../src/pages/private/Dashboard';
import { factory } from '../../utils/factory';
import {
  appendMeetups,
  setMeetups,
  subscribeMeetupRequets,
} from '../../../src/store/actions/meetup';

jest.mock('react-redux');

const mockApiGet = jest.fn();
jest.mock('../../../src/services/api', () => {
  return {
    api: {
      get: (...args) => mockApiGet(...args),
    },
  };
});

const mockUseSafeAreaInsets = jest.fn((args) => args);
jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: () => mockUseSafeAreaInsets(),
  };
});

describe('Dashboard', () => {
  beforeAll(() => {
    mockUseSafeAreaInsets.mockReturnValue({ top: 0, bottom: 0 });
  });

  it('should be able to load available meetups', async () => {
    const meetups = await factory.attrsMany('Subscription', 3);

    mockApiGet.mockResolvedValueOnce({ data: meetups });

    const dispatch = jest.fn();
    useDispatch.mockReturnValueOnce(dispatch);

    mockUseSafeAreaInsets.mockReturnValueOnce({ top: 0, bottom: 0 });

    await render(<Dashboard />);

    await waitFor(() => expect(dispatch).toHaveBeenCalled());

    expect(dispatch).toHaveBeenCalledWith(
      setMeetups(
        meetups.map((meetup) => ({
          ...meetup,
          start_time: format(parseISO(meetup.date), 'HH:mm', { locale: pt }),
        }))
      )
    );
  });

  it('should be able to load available meetups from redux', async () => {
    const meetups = await factory.attrsMany('Subscription', 3);

    mockApiGet.mockResolvedValueOnce({ data: meetups });

    const meetupsSerialized = setMeetups(
      meetups.map((meetup) => ({
        ...meetup,
        start_time: format(parseISO(meetup.date), 'HH:mm', { locale: pt }),
      }))
    ).payload;

    useSelector.mockImplementationOnce((cb) => {
      return cb({ meetups: meetupsSerialized });
    });

    const dispatch = jest.fn();
    useDispatch.mockReturnValueOnce(dispatch);

    mockUseSafeAreaInsets.mockReturnValueOnce({ top: 0, bottom: 0 });

    await render(<Dashboard />);

    meetupsSerialized.forEach((meetup) => {
      expect(screen.getByText(meetup.title)).toBeTruthy();
      expect(screen.getByTestId(`banner_${meetup.id}`).props).toHaveProperty(
        'source',
        {
          uri: meetup.banner.url,
        }
      );
      expect(screen.getByText(meetup.localization)).toBeTruthy();
      expect(screen.getByText(meetup.start_time)).toBeTruthy();
      expect(screen.getByText(meetup.organizer.name)).toBeTruthy();
    });
  });

  it('should be able to subscribe to a meetup', async () => {
    const meetup = await factory.attrs('Subscription');

    mockApiGet.mockResolvedValueOnce({ data: [meetup] });

    const meetups = setMeetups({
      ...meetup,
      start_time: format(parseISO(meetup.date), 'HH:mm', { locale: pt }),
    }).payload;

    useSelector.mockImplementationOnce((cb) => {
      return cb({ meetups: [meetups] });
    });

    const dispatch = jest.fn();
    useDispatch.mockReturnValueOnce(dispatch);

    await render(<Dashboard />);

    await fireEvent.press(screen.getByText('Inscrever-se'));

    expect(dispatch).toHaveBeenCalledWith(subscribeMeetupRequets(meetups));
  });

  it('should be able to load meetups from other dates', async () => {
    const date = new Date();
    const [previous, now, next] = await factory.attrsMany('Subscription', 3, [
      { date: subDays(date, 1).toISOString() },
      { date: date.toISOString() },
      { date: addDays(date, 1).toISOString() },
    ]);

    mockApiGet
      .mockResolvedValueOnce({
        data: [now],
      })
      .mockResolvedValueOnce({
        data: [previous],
      })
      .mockResolvedValueOnce({
        data: [now],
      })
      .mockResolvedValueOnce({
        data: [next],
      });

    const dispatch = jest.fn();
    useDispatch.mockReturnValueOnce(dispatch);

    await render(<Dashboard />);

    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith(
        setMeetups([
          {
            ...now,
            start_time: format(parseISO(now.date), 'HH:mm', {
              locale: pt,
            }),
          },
        ])
      )
    );

    dispatch.mockClear();
    useDispatch.mockReturnValueOnce(dispatch);

    await fireEvent.press(screen.getByTestId('previous'));
    await waitFor(() => expect(dispatch).toHaveBeenCalled());

    expect(dispatch).toHaveBeenCalledWith(
      setMeetups([
        {
          ...previous,
          start_time: format(parseISO(previous.date), 'HH:mm', {
            locale: pt,
          }),
        },
      ])
    );

    dispatch.mockClear();
    useDispatch.mockReturnValueOnce(dispatch);

    await fireEvent.press(screen.getByTestId('next'));
    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith(
        setMeetups([
          {
            ...now,
            start_time: format(parseISO(now.date), 'HH:mm', {
              locale: pt,
            }),
          },
        ])
      )
    );

    dispatch.mockClear();
    useDispatch.mockReturnValueOnce(dispatch);

    await fireEvent.press(screen.getByTestId('next'));
    await waitFor(() => expect(dispatch).toHaveBeenCalled());

    expect(dispatch).toHaveBeenCalledWith(
      setMeetups([
        {
          ...next,
          start_time: format(parseISO(next.date), 'HH:mm', {
            locale: pt,
          }),
        },
      ])
    );
  });

  it('should be able to get the next page of meetups', async () => {
    const date = format(new Date(), "yyyy'-'MM'-'dd");
    const [meetup1, meetup2] = await factory.attrsMany('Subscription', 2, {
      date,
    });

    mockApiGet
      .mockResolvedValueOnce({
        data: [meetup1],
      })
      .mockResolvedValueOnce({
        data: [meetup2],
      });

    meetup1.start_time = format(parseISO(meetup1.date), 'HH:mm', {
      locale: pt,
    });
    meetup2.start_time = format(parseISO(meetup2.date), 'HH:mm', {
      locale: pt,
    });
    const meetups = [meetup1, meetup2];

    const { payload } = setMeetups([meetup1]);
    useSelector
      .mockImplementationOnce((cb) => {
        return cb({ meetups: payload });
      })
      .mockImplementationOnce((cb) => {
        return cb({
          meetups,
        });
      });

    const dispatch = jest.fn();
    useDispatch.mockReturnValueOnce(dispatch).mockReturnValueOnce(dispatch);

    await render(<Dashboard />);

    await waitFor(() => screen.getByText(meetup1.title));
    await fireEvent(screen.getByTestId('meetups'), 'onEndReached');

    await waitFor(() => screen.getByText(meetup2.title));

    expect(dispatch).toHaveBeenCalledWith(appendMeetups(meetups));
  });
});
