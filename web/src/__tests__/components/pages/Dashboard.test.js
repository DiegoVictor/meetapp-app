import React from 'react';
import { format, parseISO } from 'date-fns';
import { Router } from 'react-router-dom';
import { fireEvent, render, act } from '@testing-library/react';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import history from '~/services/history';
import Dashboard from '~/components/pages/Dashboard';

const meetups = new Array(10).fill().map(() => ({
  id: faker.random.number(),
  title: faker.name.title(),
  banner: {
    url: faker.image.imageUrl(),
  },
  date: faker.date.future().toISOString(),
}));

const api_mock = new MockAdapter(api);
api_mock.onGet(`scheduled`).reply(200, meetups);

describe('Dashboard page', () => {
  it("should be able to go to create meetup's page", () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );

    fireEvent.click(getByTestId('new'));
    expect(history.location.pathname).toBe('/create');
  });

  it('should be able to get a meetups list', async () => {
    let getByTestId;
    let getByTitle;

    await act(async () => {
      const component = render(
        <Router history={history}>
          <Dashboard />
        </Router>
      );
      getByTestId = component.getByTestId;
      getByTitle = component.getByTitle;
    });

    meetups.forEach(meetup => {
      expect(getByTitle(meetup.title)).toHaveTextContent(meetup.title);
      expect(getByTestId(`date_${meetup.id}`)).toHaveTextContent(
        format(parseISO(meetup.date), "dd 'de' MMMM', às' H'h'", { locale: pt })
      );
    });
  });

  it('should be able to navigate to meetup details', async () => {
    let getByTestId;
    const meetup = faker.random.arrayElement(meetups);

    await act(async () => {
      const component = render(
        <Router history={history}>
          <Dashboard />
        </Router>
      );
      getByTestId = component.getByTestId;
    });

    fireEvent.click(getByTestId(`meetup_${meetup.id}`));
    expect(history.location.pathname).toBe(`/meetups/${meetup.id}`);
  });
});
