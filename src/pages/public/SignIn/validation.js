import * as Yup from 'yup';

export const schema = Yup.object().shape({
  email: Yup.string('O email precisa ser um texto')
    .email('O email precisa ser válido')
    .required(),
  name: Yup.string('O nome precisa ser um texto').required(),
  password: Yup.string('A senha precisa ser um texto')
    .min(6, 'A senha deve conter no minimo 6 caracteres')
    .required(),
});
