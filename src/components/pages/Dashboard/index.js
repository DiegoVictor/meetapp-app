import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import pt from 'date-fns/locale/pt-BR';

import { Container, Header } from './styles';
import api from '~/services/api';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('scheduled');
      setMeetups(
        response.data.map(meetup => ({
          ...meetup,
          formatted_date: format(
            parseISO(meetup.date),
            "dd 'de' MMMM', às' H'h'",
            { locale: pt }
          ),
        }))
      );
    })();
  }, []);

  return (
    <Container>
      <Header>
        <h2>Meus meetups</h2>
        <Link to="/edit" className="btn">
          <MdAddCircleOutline size="17" />
          Novo meetup
        </Link>
      </Header>

      <ul>
        <li>
          {meetups.map(meetup => (
            <Link key={meetup.id} to={`/meetups/${meetup.id}`}>
              <span>{meetup.title}</span>
              <time>
                {meetup.formatted_date}
                <MdChevronRight color="#FFF" size="24" />
              </time>
            </Link>
          ))}
        </li>
      </ul>
    </Container>
  );
}
