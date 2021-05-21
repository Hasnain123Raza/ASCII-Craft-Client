import { configureStore } from "@reduxjs/toolkit";

import artReducer from "../../areas/Art/services/artReducer.js";
import authenticationReducer from "../../areas/Authentication/services/authenticationReducer.js";

export default configureStore({
  reducer: {
    art: artReducer,
    authentication: authenticationReducer,
  },
});
