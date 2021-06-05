import { combineReducers } from "@reduxjs/toolkit";

import registerReducer from "../scenes/Register/services/authenticationRegisterSlice";
import loginReducer from "../scenes/Login/services/authenticationLoginSlice";
import emailVerificationReducer from "../scenes/EmailVerification/services/authenticationEmailVerificationSlice";
import recoverPasswordReducer from "../scenes/RecoverPassword/services/authenticationRecoverPasswordSlice";
import newPasswordReducer from "../scenes/NewPassword/services/authenticationNewPasswordSlice";

const authenticationReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  emailVerification: emailVerificationReducer,
  recoverPassword: recoverPasswordReducer,
  newPassword: newPasswordReducer,
});

export default authenticationReducer;
