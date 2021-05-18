import { combineReducers } from "@reduxjs/toolkit";

import createReducer from "../scenes/Create/services/artCreateSlice";

const artReducer = combineReducers({
  create: createReducer,
});

export default artReducer;
