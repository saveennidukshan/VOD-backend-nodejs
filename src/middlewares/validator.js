import { AppError } from '../utils/errors.js';

const validator = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return next(
      new AppError('Validation failed', 400, {
        errors: error.details.map((item) => item.message),
      })
    );
  }

  req.body = value;
  return next();
};

export default validator;
