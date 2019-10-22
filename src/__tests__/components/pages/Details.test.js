import React from 'react';
import { format, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import pt from 'date-fns/locale/pt-BR';

import { cancelMeetup } from '~/store/actions/meetup';
import api from '~/services/api';
import Details from '~/components/pages/Details';
import history from '~/services/history';

jest.mock('react-redux');

describe('Profile page', () => {
  const id = String(faker.random.number());
  const meetup = {
    banner: {
      url: faker.image.imageUrl(),
    },
    date: faker.date.future().toISOString(),
    description: faker.lorem.paragraphs(2),
    localization: faker.address.streetAddress(),
    title: faker.name.title(),
  };
  const api_mock = new MockAdapter(api);
  api_mock.onGet(`scheduled/${id}`).reply(200, meetup);

  it('should be able to back to dashboard', () => {
    useDispatch.mockReturnValue(jest.fn());
    const { getByTestId } = render(
      <Router history={history}>
        <Details match={{ params: { id } }} />
      </Router>
    );

    fireEvent.click(getByTestId('dashboard'));
    expect(history.location.pathname).toBe('/dashboard');
  });

  it('should be able to go to edit meetup page', () => {
    useDispatch.mockReturnValue(jest.fn());
    const { getByText } = render(
      <Router history={history}>
        <Details match={{ params: { id } }} />
      </Router>
    );

    fireEvent.click(getByText('Editar'));
    expect(history.location.pathname).toBe(`/meetups/${id}/edit`);
  });

  it('should be able to delete a meetup', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    const { getByText } = render(
      <Router history={history}>
        <Details match={{ params: { id } }} />
      </Router>
    );

    fireEvent.click(getByText('Cancelar'));
    expect(dispatch).toHaveBeenCalledWith(cancelMeetup(id));
  });

  it('should be able to see meetup data', async () => {
    useDispatch.mockReturnValue(jest.fn());
    const { getByAltText, getByTestId } = render(
      <Router history={history}>
        <Details match={{ params: { id } }} />
      </Router>
    );

    // banner
    await waitForElement(() => getByAltText(meetup.title));
    expect(getByAltText(meetup.title)).toHaveAttribute(
      'src',
      meetup.banner.url
    );

    // description
    meetup.description.split('\n').forEach((text, index) => {
      expect(getByTestId(`description_${index}`)).toHaveTextContent(
        text.trim()
      );
    });

    expect(getByTestId('date')).toHaveTextContent(
      format(parseISO(meetup.date), "dd 'de' MMMM', às' H'h'", {
        locale: pt,
      })
    );

    expect(getByTestId('localization')).toHaveTextContent(meetup.localization);
  });
});
