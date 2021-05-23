export const selectDashboard = (state) => state.account.dashboard;

export const selectGetLogoutRequestStatus = (state) =>
  selectDashboard(state).getLogoutRequestStatus;
