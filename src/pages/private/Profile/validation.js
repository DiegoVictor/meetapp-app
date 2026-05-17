import * as Yup from 'yup';

export const schema = Yup.object().shape({
  confirm_password: Yup.string(
    'A confirmmação da senha precisa ser um texto'
  ).when('password', (password, field) => {
    return password
      ? field
          .required('O campo confirmação de senha é obrigatório')
          .oneOf([Yup.ref('password')])
      : field;
  }),
  email: Yup.string('O email precisa ser um texto').email(
    'O email precisa ser válido'
  ),
  name: Yup.string('O nome precisa ser um texto'),
  old_password: Yup.string('A senha precisa ser um texto'),
  password: Yup.string('A senha precisa ser um texto')
    .min(6, 'A senha deve conter no minimo 6 caracteres')
    .when('old_password', (old_password, field) =>
      old_password ? field.required('O campo senha é obrigatório') : field
    ),
});
