export default function validateWithJoi(data, schema) {
  const validationResult = schema.validate(data, {
    abortEarly: false,
  });

  const success = !Boolean(validationResult.error);
  const errors =
    !success &&
    validationResult.error.details.map(({ message, path }) => ({
      message,
      path,
    }));

  return { success, errors };
}
