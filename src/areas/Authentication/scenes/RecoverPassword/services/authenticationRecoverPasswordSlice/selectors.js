export const selectRecoverPassword = (state) =>
  state.authentication.recoverPassword;

export const selectEmail = (state) => selectRecoverPassword(state).email;

export const selectPostRecoverPasswordRequestStatus = (state) =>
  selectRecoverPassword(state).postRecoverPasswordRequestStatus;

export const selectEmailError = (state) =>
  selectRecoverPassword(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "email"
  )[0]?.message;

export const selectAlertError = (state) =>
  selectRecoverPassword(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "alert"
  )[0]?.message;
