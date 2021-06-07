export const selectNewPassword = (state) => state.authentication.newPassword;

export const selectPassword = (state) => selectNewPassword(state).password;

export const selectPostNewPasswordRequestStatus = (state) =>
  selectNewPassword(state).postNewPasswordRequestStatus;

export const selectPasswordError = (state) =>
  selectNewPassword(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "password"
  )[0]?.message;
