import React, { useEffect, useMemo, useState } from 'react';
import { isBefore, format, parseISO } from 'date-fns';
import {
  MdArrowBack,
  MdDeleteForever,
  MdEdit,
  MdEvent,
  MdPlace,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt-BR';

import { cancelMeetup } from '~/store/actions/meetup';
import { Container, Description, Footer, Header } from './styles';
import api from '~/services/api';

export default function Details({ match }) {
  const dispatch = useDispatch();
  const { id } = match.params;
  const [meetup, setMeetup] = useState({});
  const past = useMemo(() => isBefore(meetup.date, new Date()), [meetup]);

  useEffect(() => {
    (async () => {
      const { data: m } = await api.get(`scheduled/${id}`);
      const date = parseISO(m.date);
      setMeetup({
        ...m,
        date,
        description: m.description.split(/\n/).map((text, index) => (
          <p key={String(index)} data-testid={`description_${index}`}>
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

  return (
    <Container>
      <Header>
        <h2>
          <Link to="/dashboard" data-testid="dashboard">
            <MdArrowBack color="#FFF" size="24" />
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
            <button type="button" onClick={() => dispatch(cancelMeetup(id))}>
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
          <span data-testid="date">{meetup.formatted_date}</span>
        </time>
        <span>
          <MdPlace size="16" />
          <span data-testid="localization">{meetup.localization}</span>
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
