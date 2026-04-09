import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import pt from 'date-fns/locale/pt';
import { addDays, format, parseISO, subDays } from 'date-fns';
import MockAdapter from 'axios-mock-adapter';

import { Dashboard } from '~/pages/Dashboard';
import factory from '../utils/factory';
import api from '~/services/api';
import {
  appendMeetups,
  setMeetups,
  subscribeMeetupRequets,
} from '~/store/actions/meetup';

jest.mock('react-redux');

const mockedNavigate = jest.fn(args => args);
jest.mock('react-navigation', () => {
  return {
    NavigationActions: {
      navigate: args => {
        return mockedNavigate(args);
      },
    },
  };
});

describe('Dashboard', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to load available meetups', async () => {
    const meetups = await factory.attrsMany('Subscription', 3);

    apiMock.onGet('meetups').reply(200, meetups);

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(<Dashboard />);

    await waitFor(() => expect(dispatch).toHaveBeenCalled());

    expect(dispatch).toHaveBeenCalledWith(
      setMeetups(
        meetups.map(meetup => ({
          ...meetup,
          formatted_date: format(
            parseISO(meetup.date),
            "dd 'de' MMMM', às' HH'h'",
            { locale: pt }
          ),
        }))
      )
    );
  });

  it('should be able to load available meetups from redux', async () => {
    const meetups = await factory.attrsMany('Subscription', 3);

    apiMock.onGet('meetups').reply(200, meetups);

    const meetupsSerialized = setMeetups(
      meetups.map(meetup => ({
        ...meetup,
        formatted_date: format(
          parseISO(meetup.date),
          "dd 'de' MMMM', às' HH'h'",
          { locale: pt }
        ),
      }))
    ).payload;

    useSelector.mockImplementation(cb => {
      return cb({ meetups: meetupsSerialized });
    });

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByText, getByTestId } = render(<Dashboard />);

    meetupsSerialized.forEach(meetup => {
      expect(getByText(meetup.title)).toBeTruthy();
      expect(getByTestId(`banner_${meetup.id}`).props).toHaveProperty(
        'source',
        {
          uri: meetup.banner.url,
        }
      );
      expect(getByText(meetup.localization)).toBeTruthy();
      expect(getByText(meetup.formatted_date)).toBeTruthy();
      expect(getByText(`Organizador: ${meetup.organizer.name}`)).toBeTruthy();
    });
  });

  it('should be able to subscribe to a meetup', async () => {
    const meetup = await factory.attrs('Subscription');

    apiMock.onGet('meetups').reply(200, [meetup]);

    const meetupSerialized = setMeetups({
      ...meetup,
      formatted_date: format(
        parseISO(meetup.date),
        "dd 'de' MMMM', às' HH'h'",
        { locale: pt }
      ),
    }).payload;

    useSelector.mockImplementation(cb => {
      return cb({ meetups: [meetupSerialized] });
    });

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByText } = render(<Dashboard />);

    fireEvent.press(getByText('Realizar Inscrição'));

    expect(dispatch).toHaveBeenCalledWith(
      subscribeMeetupRequets(meetupSerialized)
    );
  });

  it('should be able to load meetups from other dates', async () => {
    const date = new Date();
    const [previous, now, next] = await factory.attrsMany('Subscription', 3, [
      { date: subDays(date, 1).toISOString() },
      { date: date.toISOString() },
      { date: addDays(date, 1).toISOString() },
    ]);

    apiMock.reset();
    apiMock
      .onGet('/meetups', {
        params: {
          page: 1,
          date: format(parseISO(now.date), "yyyy'-'MM'-'dd"),
        },
      })
      .reply(200, [now])
      .onGet('/meetups', {
        params: {
          page: 1,
          date: format(parseISO(previous.date), "yyyy'-'MM'-'dd"),
        },
      })
      .reply(200, [previous])
      .onGet('/meetups', {
        params: {
          page: 1,
          date: format(parseISO(next.date), "yyyy'-'MM'-'dd"),
        },
      })
      .reply(200, [next]);

    const meetupSerialized = setMeetups([
      {
        ...now,
        formatted_date: format(parseISO(now.date), "dd 'de' MMMM', às' HH'h'", {
          locale: pt,
        }),
      },
    ]);

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByTestId } = render(<Dashboard />);

    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith(meetupSerialized)
    );

    dispatch.mockClear();
    fireEvent.press(getByTestId('previous'));
    await waitFor(() => expect(dispatch).toHaveBeenCalled());

    expect(dispatch).toHaveBeenCalledWith(
      setMeetups([
        {
          ...previous,
          formatted_date: format(
            parseISO(previous.date),
            "dd 'de' MMMM', às' HH'h'",
            {
              locale: pt,
            }
          ),
        },
      ])
    );

    fireEvent.press(getByTestId('next'));
    await waitFor(() =>
      expect(dispatch).toHaveBeenCalledWith(meetupSerialized)
    );

    dispatch.mockClear();
    fireEvent.press(getByTestId('next'));
    await waitFor(() => expect(dispatch).toHaveBeenCalled());

    expect(dispatch).toHaveBeenCalledWith(
      setMeetups([
        {
          ...next,
          formatted_date: format(
            parseISO(next.date),
            "dd 'de' MMMM', às' HH'h'",
            {
              locale: pt,
            }
          ),
        },
      ])
    );
  });

  it('should be able to get the next page of meetups', async () => {
    const date = format(new Date(), "yyyy'-'MM'-'dd");
    const [page1, page2] = await factory.attrsMany('Subscription', 2, { date });

    apiMock.reset();
    apiMock
      .onGet('/meetups', {
        params: {
          page: 1,
          date,
        },
      })
      .reply(200, [page1])
      .onGet('/meetups', {
        params: {
          page: 2,
          date,
        },
      })
      .reply(200, [page2]);

    const page1Serialized = setMeetups([
      {
        ...page1,
        formatted_date: format(
          parseISO(page1.date),
          "dd 'de' MMMM', às' HH'h'",
          { locale: pt }
        ),
      },
    ]);

    useSelector.mockImplementation(cb => {
      return cb({ meetups: page1Serialized.payload });
    });

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const component = <Dashboard />;
    const { getByText, getByTestId } = render(component);

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(page1Serialized));

    const allSerialized = [
      {
        ...page1,
        formatted_date: format(
          parseISO(page1.date),
          "dd 'de' MMMM', às' HH'h'",
          { locale: pt }
        ),
      },
      {
        ...page2,
        formatted_date: format(
          parseISO(page2.date),
          "dd 'de' MMMM', às' HH'h'",
          { locale: pt }
        ),
      },
    ];
    useSelector.mockImplementation(cb => {
      return cb({
        meetups: allSerialized,
      });
    });

    dispatch.mockClear();
    await waitFor(() => {
      fireEvent.scroll(getByTestId('meetups'), {
        nativeEvent: {
          contentSize: {
            height: 500,
            width: 100,
          },
          contentOffset: {
            y: 500,
          },
          layoutMeasurement: {
            height: 100,
            width: 100,
          },
        },
      });
    });

    await waitFor(() => expect(getByText(page2.title)));

    expect(dispatch).toHaveBeenCalledWith(appendMeetups(allSerialized));
  });
});
