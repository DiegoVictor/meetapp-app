import React from 'react';
import faker from 'faker';
import { act, render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';

import history from '~/services/history';
import Create from '~/components/pages/Create';
import api from '~/services/api';
import { upsertMeetup } from '~/store/actions/meetup';

jest.mock('react-redux');

const dispatch = jest.fn();
const id = faker.random.number();
const banner_id = faker.random.number();
const url = faker.image.imageUrl();
const api_mock = new MockAdapter(api);

useDispatch.mockReturnValue(dispatch);
api_mock.onPost('files').reply(200, { id: banner_id, url });

describe('Create page', () => {
  it('should be able to go back', async () => {
    const { getByTestId } = render(
      <Create match={{ params: { id } }} history={history} />
    );

    fireEvent.click(getByTestId('back'));
    expect(history.location.pathname).toBe('/');
  });

  it('should be able to upload image', async () => {
    const { getByTestId, getByAltText } = render(
      <Create match={{ params: { id } }} history={history} />
    );

    await act(async () => {
      fireEvent.change(getByTestId('file'), {
        target: { files: [new Blob(['content'])] },
      });
    });

    expect(getByAltText('Preview')).toHaveAttribute('src', url);
  });

  it('should be able to create a meetup', async () => {
    const title = faker.name.title();
    const description = faker.lorem.paragraph();
    const localization = faker.address.streetAddress(2);
    const date = faker.date.future();

    date.setMilliseconds(0);

    const { getByTestId, getByPlaceholderText } = render(
      <Create match={{ params: { id } }} history={history} />
    );

    fireEvent.change(getByPlaceholderText('Título do Meetup'), {
      target: { value: title },
    });

    fireEvent.change(getByPlaceholderText('Descrição completa'), {
      target: { value: description },
    });

    fireEvent.change(getByPlaceholderText('Localização'), {
      target: { value: localization },
    });

    await act(async () => {
      fireEvent.change(getByPlaceholderText('Data do evento'), {
        target: { value: date },
      });
    });

    await act(async () => {
      fireEvent.change(getByTestId('file'), {
        target: { files: [new Blob(['content'])] },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId('form'));
    });

    expect(dispatch).toHaveBeenCalledWith(
      upsertMeetup({
        title,
        description,
        localization,
        date,
        banner_id,
      })
    );
  });
});
