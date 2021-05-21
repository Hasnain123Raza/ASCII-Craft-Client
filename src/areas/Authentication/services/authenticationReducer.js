import { combineReducers } from "@reduxjs/toolkit";

import registerReducer from "../scenes/Register/services/authenticationRegisterSlice";

const authenticationReducer = combineReducers({
  register: registerReducer,
});

export default authenticationReducer;
