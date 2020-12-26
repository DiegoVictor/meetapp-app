import React from 'react';
import { useDispatch } from 'react-redux';
import { act, fireEvent, render } from '@testing-library/react';
import faker from 'faker';
import MockAdapter from 'axios-mock-adapter';

import Edit from '~/components/pages/Edit';
import history from '~/services/history';
import api from '~/services/api';
import { upsertMeetup } from '~/store/actions/meetup';

jest.mock('react-redux');
jest.mock('~/services/history');

const dispatch = jest.fn();
const id = faker.random.number();
const url = faker.image.imageUrl();
const meetup = {
  title: faker.name.title(),
  localization: faker.address.streetAddress(),
  date: faker.date.future(),
  banner: { url },
};
const api_mock = new MockAdapter(api);

api_mock.onGet(`scheduled/${id}`).reply(200, meetup);
api_mock.onPost('files').reply(200, {
  id: faker.random.number(),
  url,
});

useDispatch.mockReturnValue(dispatch);
history.goBack = jest.fn();

describe('Edit page', () => {
  it('should be able to back to previous page', () => {
    const { getByTestId } = render(
      <Edit history={history} match={{ params: { id: null } }} />
    );

    fireEvent.click(getByTestId('back'));
    expect(history.goBack).toHaveBeenCalled();
  });

  it('should be able to update a meetup', async () => {
    const description = faker.lorem.paragraphs(1);
    const date = faker.date.future();
    let getByPlaceholderText;
    let getByTestId;

    date.setMilliseconds(0);

    await act(async () => {
      const component = render(
        <Edit history={history} match={{ params: { id } }} />
      );
      getByPlaceholderText = component.getByPlaceholderText;
      getByTestId = component.getByTestId;
    });

    fireEvent.change(getByPlaceholderText('Descrição completa'), {
      target: { value: description },
    });

    fireEvent.change(getByPlaceholderText('Data do evento'), {
      target: { value: date },
    });

    await act(async () => {
      fireEvent.submit(getByTestId('form'));
    });

    expect(dispatch).toHaveBeenLastCalledWith(
      upsertMeetup({
        ...meetup,
        description,
        banner: '',
        date,
        id,
      })
    );
  });

  it('should be able to upload a image', async () => {
    let getByTestId;
    let getByAltText;

    await act(async () => {
      const component = render(
        <Edit history={history} match={{ params: { id } }} />
      );
      getByTestId = component.getByTestId;
      getByAltText = component.getByAltText;
    });

    await act(async () => {
      fireEvent.change(getByTestId('file'), {
        target: { files: [new Blob(['content'])] },
      });
    });

    expect(getByAltText('Preview')).toHaveAttribute('src', url);
  });
});
