import { configureStore } from "@reduxjs/toolkit";

import artReducer from "../../areas/Art/services/artReducer.js";
import authenticationReducer from "../../areas/Authentication/services/authenticationReducer.js";
import accountReducer from "../../areas/Account/services/accountReducer.js";

import authenticatedSlice from "../authenticatedSlice";

export default configureStore({
  reducer: {
    art: artReducer,
    authentication: authenticationReducer,
    account: accountReducer,

    authenticated: authenticatedSlice,
  },
});
