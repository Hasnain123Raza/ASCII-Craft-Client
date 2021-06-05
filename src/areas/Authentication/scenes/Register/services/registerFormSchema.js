import Joi from "joi";

import {
  username,
  email,
  password,
  recaptchaToken,
} from "../../../services/validationSchemas.js";

const userSchema = Joi.object({
  username,
  email,
  password,
});

export default Joi.object({
  user: userSchema,
  recaptchaToken,
});
