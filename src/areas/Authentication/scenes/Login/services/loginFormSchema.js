import Joi from "joi";

import {
  email,
  password,
  recaptchaToken,
} from "../../../services/validationSchemas.js";

const userSchema = Joi.object({
  email,
  password,
});

export default Joi.object({
  user: userSchema,
  recaptchaToken,
});
