import * as Yup from 'yup';

export const schema = Yup.object().shape({
  confirmPassword: Yup.string(
    'A confirmmação da senha precisa ser um texto'
  ).when('password', ([password], field) => {
    return password
      ? field
          .required('O campo confirmação de senha é obrigatório')
          .oneOf([Yup.ref('password')])
      : field;
  }),
  oldPassword: Yup.string('A senha precisa ser um texto').required(
    'O campo senha é obrigatório'
  ),
  password: Yup.string('A senha precisa ser um texto')
    .min(6, 'A senha deve conter no minimo 6 caracteres')
    .when('oldPassword', ([oldPassword], field) =>
      oldPassword ? field.required('O campo senha é obrigatório') : field
    ),
});
