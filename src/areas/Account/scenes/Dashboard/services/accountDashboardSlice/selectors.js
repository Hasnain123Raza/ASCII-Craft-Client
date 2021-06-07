export const selectDashboard = (state) => state.account.dashboard;

export const selectGetEmailVerificationRequestStatus = (state) =>
  selectDashboard(state).getEmailVerificationRequestStatus;

export const selectGetLogoutRequestStatus = (state) =>
  selectDashboard(state).getLogoutRequestStatus;
