import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string('O email precisa ser um texto')
    .email('O email precisa ser válido')
    .required('O campo email é obrigatório'),
  name: Yup.string('O nome precisa ser um texto').required(
    'O campo nome é obrigatório'
  ),
});
