import React from 'react';
import { format, parseISO } from 'date-fns';
import { Router } from 'react-router-dom';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import history from '~/services/history';
import Dashboard from '~/components/pages/Dashboard';

const meetups = (() => {
  const result = [];
  for (let i = 0; i < 10; i += 1) {
    result.push({
      id: faker.random.number(),
      title: faker.name.title(),
      banner: {
        url: faker.image.imageUrl(),
      },
      date: faker.date.future().toISOString(),
    });
  }
  return result;
})();

const api_mock = new MockAdapter(api);
api_mock.onGet(`scheduled`).reply(200, meetups);

describe('Dashboard page', () => {
  it("should be able to go to create/edit meetup's page", () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );

    fireEvent.click(getByTestId('new'));
    expect(history.location.pathname).toBe('/edit');
  });

  it('should be able to get a meetups list', async () => {
    const { getByTestId, getByTitle } = render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );

    await waitForElement(() => getByTestId(`meetup_${meetups[0].id}`));
    meetups.forEach(meetup => {
      expect(getByTitle(meetup.title)).toHaveTextContent(meetup.title);
      expect(getByTestId(`date_${meetup.id}`)).toHaveTextContent(
        format(parseISO(meetup.date), "dd 'de' MMMM', às' H'h'", { locale: pt })
      );
    });
  });

  it('should be able to navigate to meetup details', async () => {
    const meetup = meetups[Math.floor(meetups.length * Math.random())];
    const { getByTestId } = render(
      <Router history={history}>
        <Dashboard />
      </Router>
    );

    await waitForElement(() => getByTestId(`meetup_${meetup.id}`));
    fireEvent.click(getByTestId(`meetup_${meetup.id}`));
    expect(history.location.pathname).toBe(`/meetups/${meetup.id}`);
  });
});
