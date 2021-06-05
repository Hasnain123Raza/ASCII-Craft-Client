import Joi from "joi";

import { password } from "../../../services/validationSchemas.js";

export default Joi.object({
  _id: Joi.string().required(),
  token: Joi.string().guid().required(),
  password,
});
