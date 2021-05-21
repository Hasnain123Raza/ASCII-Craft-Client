import { combineReducers } from "@reduxjs/toolkit";

import registerReducer from "../scenes/Register/services/authenticationRegisterSlice";
import loginReducer from "../scenes/Login/services/authenticationLoginSlice";

const authenticationReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
});

export default authenticationReducer;
