import { combineReducers } from "@reduxjs/toolkit";

import createReducer from "../scenes/Create/services/artCreateSlice";
import browseReducer from "../scenes/Browse/services/artBrowseSlice";
import openReducer from "../scenes/Open/services/artOpenSlice";

const artReducer = combineReducers({
  create: createReducer,
  browse: browseReducer,
  open: openReducer,
});

export default artReducer;
