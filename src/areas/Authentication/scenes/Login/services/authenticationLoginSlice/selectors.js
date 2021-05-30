export const selectLogin = (state) => state.authentication.login;

export const selectUsername = (state) => selectLogin(state).username;

export const selectPassword = (state) => selectLogin(state).password;

export const selectRecaptchaToken = (state) =>
  selectLogin(state).recaptchaToken;

export const selectPostLoginUserRequestStatus = (state) =>
  selectLogin(state).postLoginUserRequestStatus;

export const selectUsernameError = (state) =>
  selectLogin(state).validationErrors.filter(
    ({ path }) =>
      path.length == 2 && path[0] === "user" && path[1] === "username"
  )[0]?.message;

export const selectPasswordError = (state) =>
  selectLogin(state).validationErrors.filter(
    ({ path }) =>
      path.length == 2 && path[0] === "user" && path[1] === "password"
  )[0]?.message;
