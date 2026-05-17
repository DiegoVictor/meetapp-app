import { Formik } from 'formik';
import styled from 'styled-components/native';
import { Button } from '../../../components/Button';
import { Container } from '../../../components/Container';

export const Container = styled(Container)`
  padding: 20px 20px;
  margin-top: 30px;
`;

export const Form = styled(Formik)`
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export const FormButton = styled(Button)`
  margin-bottom: 5px;
  width: 100%;
`;

export const Separator = styled.View`
  background-color: rgba(255, 255, 255, 0.1);
  height: 1px;
  margin-bottom: 20px;
  margin-top: 10px;
`;
