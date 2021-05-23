import { combineReducers } from "@reduxjs/toolkit";

import dashboardReducer from "../scenes/Dashboard/services/accountDashboardSlice";

const accountReducer = combineReducers({
  dashboard: dashboardReducer,
});

export default accountReducer;
