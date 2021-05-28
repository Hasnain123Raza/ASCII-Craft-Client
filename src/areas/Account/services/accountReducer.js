import { combineReducers } from "@reduxjs/toolkit";

import dashboardReducer from "../scenes/Dashboard/services/accountDashboardSlice";
import profileReducer from "../scenes/Profile/services/accountProfileSlice";

const accountReducer = combineReducers({
  dashboard: dashboardReducer,
  profile: profileReducer,
});

export default accountReducer;
