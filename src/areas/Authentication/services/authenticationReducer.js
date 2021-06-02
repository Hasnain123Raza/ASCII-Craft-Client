import { combineReducers } from "@reduxjs/toolkit";

import registerReducer from "../scenes/Register/services/authenticationRegisterSlice";
import loginReducer from "../scenes/Login/services/authenticationLoginSlice";
import emailVerificationReducer from "../scenes/EmailVerification/services/authenticationEmailVerificationSlice";

const authenticationReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  emailVerification: emailVerificationReducer,
});

export default authenticationReducer;
