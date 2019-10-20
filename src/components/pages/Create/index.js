import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { MdArrowBack, MdCameraAlt, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { upsertMeetup } from '~/store/actions/meetup';
import { Container, ImagePicker } from './styles';
import api from '~/services/api';

const schema = Yup.object().shape({
  description: Yup.string()
    .min(10, 'Poxa, explica mais sobre esse meetup ;)')
    .required('O campo descrição é obrigatório'),
  localization: Yup.string().required('O campo localização é obrigatório'),
  title: Yup.string()
    .min(6, 'O título deve ter no minimo 6 caracteres')
    .required('O campo título é obrigatório'),
});

export default function Create({ match, history }) {
  const [banner_id, setBannerId] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const { id } = match.params;
  const [meetup, setMeetup] = useState({});
  const [preview, setPreview] = useState(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    (async () => {
      if (id) {
        const { data } = await api.get(`scheduled/${id}`);
        const dt = parseISO(data.date);

        setBannerId(data.banner_id);
        setDate(format(dt, "yyyy'-'MM'-'dd"));
        setMeetup(data);
        setPreview(data.banner.url);
        setTime(format(dt, "HH':'mm"));
      }
    })();
  }, [id]);

  return (
    <Container>
      <div>
        <button
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
          dispatch(
            upsertMeetup({
              ...data,
              id,
              banner_id,
              date: `${date}T${time}:00-03:00`,
            })
          );
        }}
      >
        <ImagePicker htmlFor="banner">
          {preview && <img src={preview} alt="" />}
          <div>
            <MdCameraAlt size="54" />
            <span>Selecionar imagem</span>
          </div>
          <input
            id="banner"
            type="file"
            onChange={async e => {
              const data = new FormData();
              data.append('file', e.target.files[0]);
              const response = await api.post('files', data);

              setBannerId(response.data.id);
              setPreview(response.data.url);
            }}
          />
        </ImagePicker>
        <Input name="title" type="text" placeholder="Título do Meetup" />
        <Input
          name="description"
          multiline
          rows="10"
          placeholder="Descrição completa"
          value={meetup.description}
          onChange={e => setMeetup({ ...meetup, description: e.target.value })}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <Input name="localization" type="text" placeholder="Localização" />
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

Create.defaultProps = {
  match: { param: {} },
};

Create.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
