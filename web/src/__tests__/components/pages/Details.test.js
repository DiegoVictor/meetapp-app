import React from 'react';
import { format, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';
import { fireEvent, render, act } from '@testing-library/react';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';
import pt from 'date-fns/locale/pt-BR';

import { cancelMeetup } from '~/store/actions/meetup';
import api from '~/services/api';
import Details from '~/components/pages/Details';
import history from '~/services/history';

jest.mock('react-redux');

const dispatch = jest.fn();
const id = faker.random.number();
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
useDispatch.mockReturnValue(dispatch);

describe('Profile page', () => {
  it('should be able to back to dashboard', () => {
    const { getByTestId } = render(
      <Router history={history}>
        <Details match={{ params: { id } }} />
      </Router>
    );

    fireEvent.click(getByTestId('dashboard'));
    expect(history.location.pathname).toBe('/dashboard');
  });

  it('should be able to go to edit meetup page', () => {
    const { getByText } = render(
      <Router history={history}>
        <Details match={{ params: { id } }} />
      </Router>
    );

    fireEvent.click(getByText('Editar'));
    expect(history.location.pathname).toBe(`/meetups/${id}/edit`);
  });

  it('should be able to delete a meetup', () => {
    const { getByText } = render(
      <Router history={history}>
        <Details match={{ params: { id } }} />
      </Router>
    );

    fireEvent.click(getByText('Cancelar'));
    expect(dispatch).toHaveBeenCalledWith(cancelMeetup(id));
  });

  it('should be able to see meetup data', async () => {
    let getByAltText;
    let getByTestId;

    await act(async () => {
      const component = render(
        <Router history={history}>
          <Details match={{ params: { id } }} />
        </Router>
      );
      getByAltText = component.getByAltText;
      getByTestId = component.getByTestId;
    });

    expect(getByAltText(meetup.title)).toHaveAttribute(
      'src',
      meetup.banner.url
    );

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
