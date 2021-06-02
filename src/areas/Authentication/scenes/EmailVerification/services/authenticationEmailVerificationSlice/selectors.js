export const selectEmailVerification = (state) =>
  state.authentication.emailVerification;

export const selectGetEmailVerificationRequestStatus = (state) =>
  selectEmailVerification(state).getEmailVerificationRequestStatus;

export const selectAlertError = (state) =>
  selectEmailVerification(state).errors.filter(
    ({ path }) => path.length === 1 && path[0] === "alert"
  )[0]?.message;
