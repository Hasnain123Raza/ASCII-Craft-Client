export const selectRegister = (state) => state.authentication.register;

export const selectUsername = (state) => selectRegister(state).username;

export const selectPassword = (state) => selectRegister(state).password;

export const selectRecaptchaToken = (state) =>
  selectRegister(state).recaptchaToken;

export const selectPostRegisterUserRequestStatus = (state) =>
  selectRegister(state).postRegisterUserRequestStatus;

export const selectUsernameError = (state) =>
  selectRegister(state).validationErrors.filter(
    ({ path }) =>
      path.length == 2 && path[0] === "user" && path[1] === "username"
  )[0]?.message;

export const selectPasswordError = (state) =>
  selectRegister(state).validationErrors.filter(
    ({ path }) =>
      path.length == 2 && path[0] === "user" && path[1] === "password"
  )[0]?.message;
