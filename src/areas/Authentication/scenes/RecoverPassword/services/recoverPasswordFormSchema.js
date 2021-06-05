import Joi from "joi";

import { email } from "../../../services/validationSchemas.js";

export default Joi.object({
  email,
});
