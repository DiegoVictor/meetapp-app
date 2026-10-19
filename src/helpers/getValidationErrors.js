export const getValidationErrors = (err) => {
  const validationErrors = {};

  err.inner.forEach((error) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });
  return validationErrors;
};
