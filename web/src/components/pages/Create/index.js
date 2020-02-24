import React, { useCallback, useState } from 'react';
import { MdArrowBack, MdCameraAlt, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import Datepicker from '~/components/Datepicker';
import { upsertMeetup } from '~/store/actions/meetup';
import { Container, ImagePicker } from './styles';
import api from '~/services/api';

export default function Create({ history }) {
  const dispatch = useDispatch();
  const [meetup, setMeetup] = useState({});
  const [preview, setPreview] = useState(null);

  const uploadBanner = useCallback(
    e => {
      (async () => {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        const response = await api.post('files', data);

        setMeetup({
          ...meetup,
          banner_id: response.data.id,
        });
        setPreview(response.data.url);
      })();
    },
    [meetup]
  );

  const schema = Yup.object().shape({
    date: Yup.date().required('O campo data é obrigatório'),
    description: Yup.string()
      .min(10, 'Poxa, explica mais sobre esse meetup ;)')
      .required('O campo descrição é obrigatório'),
    localization: Yup.string().required('O campo localização é obrigatório'),
    title: Yup.string()
      .min(6, 'O título deve ter no minimo 6 caracteres')
      .required('O campo título é obrigatório'),
  });

  return (
    <Container>
      <div>
        <button
          data-testid="back"
          type="button"
          className="unstyled"
          onClick={() => history.goBack()}
        >
          <MdArrowBack color="#FFF" size="24" />
        </button>
      </div>
      <Form
        initialData={meetup}
        schema={schema}
        onSubmit={data => {
          if (typeof meetup.banner_id === 'number') {
            dispatch(
              upsertMeetup({
                ...meetup,
                ...data,
              })
            );
          }
        }}
      >
        <ImagePicker htmlFor="banner">
          {preview && <img src={preview} alt="Preview" />}
          <div>
            <MdCameraAlt size="54" />
            <span>Selecionar imagem</span>
          </div>
          <Input
            data-testid="file"
            accept="image/*"
            id="banner"
            name="banner"
            type="file"
            onChange={uploadBanner}
          />
        </ImagePicker>

        <Input name="title" type="text" placeholder="Título do Meetup" />
        <Input
          name="description"
          multiline
          placeholder="Descrição completa"
          rows={10}
          value={meetup.description}
          onChange={e => setMeetup({ ...meetup, description: e.target.value })}
        />
        <Datepicker
          name="date"
          placeholderText="Data do evento"
          value={meetup.date}
          onChange={value => {
            setMeetup({
              ...meetup,
              date: value,
            });
          }}
        />
        <Input name="localization" placeholder="Localização" type="text" />
        <div>
          <button type="submit">
            <MdSave size="17" />
            Salvar meetup
          </button>
        </div>
      </Form>
    </Container>
  );
}

Create.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
