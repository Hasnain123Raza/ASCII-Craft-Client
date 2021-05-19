import { combineReducers } from "@reduxjs/toolkit";

import createReducer from "../scenes/Create/services/artCreateSlice";
import browseReducer from "../scenes/Browse/services/artBrowseSlice";

const artReducer = combineReducers({
  create: createReducer,
  browse: browseReducer,
});

export default artReducer;
