import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Subscription from '~/pages/Subscription';
import factory from '../utils/factory';
import api from '~/services/api';
import { setSubscriptions } from '~/store/actions/subscription';
import { unsubscribeMeetupRequest } from '~/store/actions/meetup';

jest.mock('react-redux');

describe('Subscription', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to load subcriptions', async () => {
    const subscriptions = await factory.attrsMany('Subscription', 3);

    apiMock.onGet('subscriptions').reply(200, subscriptions);

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    render(<Subscription />);

    await waitFor(() => expect(dispatch).toHaveBeenCalled());

    expect(dispatch).toHaveBeenCalledWith(
      setSubscriptions(
        subscriptions.map(subscription => ({
          ...subscription,
          formatted_date: format(
            parseISO(subscription.date),
            "dd 'de' MMMM', às' HH'h'",
            { locale: pt }
          ),
        }))
      )
    );
  });

  it('should be able to load subcriptions from redux', async () => {
    const subscriptions = await factory.attrsMany('Subscription', 3);

    apiMock.onGet('subscriptions').reply(200, subscriptions);

    const subscriptionsSerialized = setSubscriptions(
      subscriptions.map(subscription => ({
        ...subscription,
        formatted_date: format(
          parseISO(subscription.date),
          "dd 'de' MMMM', às' HH'h'",
          { locale: pt }
        ),
      }))
    ).payload;

    useSelector.mockImplementation(cb => {
      return cb({ subscriptions: subscriptionsSerialized });
    });

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByText, getByTestId } = render(<Subscription />);

    subscriptionsSerialized.forEach(subscription => {
      expect(getByText(subscription.title)).toBeTruthy();
      expect(
        getByTestId(`banner_${subscription.id}`).props
      ).toHaveProperty('source', { uri: subscription.banner.url });
      expect(getByText(subscription.localization)).toBeTruthy();
      expect(getByText(subscription.formatted_date)).toBeTruthy();
      expect(
        getByText(`Organizador: ${subscription.organizer.name}`)
      ).toBeTruthy();
    });
  });

  it('should be able to cancel one subcription', async () => {
    const subscription = await factory.attrs('Subscription');

    apiMock.onGet('subscriptions').reply(200, [subscription]);

    const subscriptionsSerialized = setSubscriptions({
      ...subscription,
      formatted_date: format(
        parseISO(subscription.date),
        "dd 'de' MMMM', às' HH'h'",
        { locale: pt }
      ),
    }).payload;

    useSelector.mockImplementation(cb => {
      return cb({ subscriptions: [subscriptionsSerialized] });
    });

    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByText, getByTestId } = render(<Subscription />);

    await waitFor(() => expect(getByText('Cancelar inscrição')).toBeTruthy());

    fireEvent.press(getByTestId(`meetup_` + subscription.id));

    expect(dispatch).toHaveBeenCalledWith(
      unsubscribeMeetupRequest(subscriptionsSerialized)
    );
  });
});
