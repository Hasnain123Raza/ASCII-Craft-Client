import { configureStore } from "@reduxjs/toolkit";

import artReducer from "../../areas/Art/services/artReducer.js";

export default configureStore({
  reducer: {
    art: artReducer,
  },
});
