export const selectEmailVerification = (state) =>
  state.authentication.emailVerification;

export const selectGetEmailVerificationRequestStatus = (state) =>
  selectEmailVerification(state).getEmailVerificationRequestStatus;
