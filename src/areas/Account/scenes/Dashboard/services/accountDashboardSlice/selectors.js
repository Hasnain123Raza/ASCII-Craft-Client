export const selectDashboard = (state) => state.account.dashboard;

export const selectGetEmailVerificationRequestStatus = (state) =>
  selectDashboard(state).getEmailVerificationRequestStatus;

export const selectGetLogoutRequestStatus = (state) =>
  selectDashboard(state).getLogoutRequestStatus;

export const selectAlertError = (state) =>
  selectDashboard(state).errors.filter(
    ({ path }) => path.length === 1 && path[0] === "alert"
  )[0]?.message;
