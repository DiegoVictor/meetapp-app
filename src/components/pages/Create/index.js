import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { parseISO, format } from 'date-fns';
import { MdArrowBack, MdSave, MdCameraAlt } from 'react-icons/md';
import { Container, ImagePicker } from './styles';
import api from '../../../services/api';
import { upsertMeetup } from '../../../store/actions/meetup';

const schema = Yup.object().shape({
  title: Yup.string()
    .min(6, 'O título deve ter no minimo 6 caracteres')
    .required('O campo título é obrigatório'),
  description: Yup.string()
    .min(10, 'Poxa, explica mais sobre esse meetup ;)')
    .required('O campo descrição é obrigatório'),
  localization: Yup.string().required('O campo localização é obrigatório'),
});

export default function Create({ match, history }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState({});
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [banner_id, setBannerId] = useState('');
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (id) {
        const { data } = await api.get(`scheduled/${id}`);
        const dt = parseISO(data.date);

        setMeetup(data);
        setDate(format(dt, "yyyy'-'MM'-'dd"));
        setTime(format(dt, "HH':'mm"));
        setPreview(data.banner.url);
        setBannerId(data.banner_id);
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
        schema={schema}
        initialData={meetup}
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
          placeholder="Descrição"
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

Create.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

Create.defaultProps = {
  match: { param: {} },
};
