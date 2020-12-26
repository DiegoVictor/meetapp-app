import styled from 'styled-components/native';
import TextButton from '../../TextButton';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const Form = styled.View`
  justify-content: center;
  margin-top: 50px;
  max-width: 315px;
  text-align: center;
  width: 100%;
`;

export const TextLink = styled(TextButton)`
  margin-top: 20px;
`;
