import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format, parseISO, isBefore } from 'date-fns';
import {
  MdEdit,
  MdDeleteForever,
  MdEvent,
  MdPlace,
  MdArrowBack,
} from 'react-icons/md';
import pt from 'date-fns/locale/pt-BR';
import { Container, Header, Description, Footer } from './styles';
import api from '~/services/api';
import { cancelMeetup } from '~/store/actions/meetup';

export default function Details({ match }) {
  const { id } = match.params;
  const [meetup, setMeetup] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { data: m } = await api.get(`scheduled/${id}`);
      const date = parseISO(m.date);
      setMeetup({
        ...m,
        date,
        description: m.description.split(/\n/).map((text, index) => (
          <p key={String(index)}>
            {text}
            <br />
          </p>
        )),
        formatted_date: format(date, "dd 'de' MMMM', às' H'h'", {
          locale: pt,
        }),
      });
    })();
  }, [id]);

  const past = useMemo(() => isBefore(meetup.date, new Date()), [meetup]);

  return (
    <Container>
      <Header>
        <h2>
          <Link to="/dashboard">
            <MdArrowBack size="24" color="#FFF" />
          </Link>
          {meetup.title}
        </h2>
        <div>
          {!past && (
            <Link to={`/meetups/${id}/edit`} className="btn blue">
              <MdEdit size="17" />
              Editar
            </Link>
          )}
          {!past && (
            <button onClick={() => dispatch(cancelMeetup(id))} type="button">
              <MdDeleteForever size="17" />
              Cancelar
            </button>
          )}
        </div>
      </Header>

      {meetup.banner && <img src={meetup.banner.url} alt={meetup.title} />}

      <Description>{meetup.description}</Description>

      <Footer>
        <time>
          <MdEvent size="16" />
          <span>{meetup.formatted_date}</span>
        </time>
        <span>
          <MdPlace size="16" />
          <span>{meetup.localization}</span>
        </span>
      </Footer>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
