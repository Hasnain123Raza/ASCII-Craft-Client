export const selectLogin = (state) => state.authentication.login;

export const selectEmail = (state) => selectLogin(state).email;

export const selectPassword = (state) => selectLogin(state).password;

export const selectRecaptchaToken = (state) =>
  selectLogin(state).recaptchaToken;

export const selectPostLoginUserRequestStatus = (state) =>
  selectLogin(state).postLoginUserRequestStatus;

export const selectEmailError = (state) =>
  selectLogin(state).validationErrors.filter(
    ({ path }) => path.length == 2 && path[0] === "user" && path[1] === "email"
  )[0]?.message;

export const selectPasswordError = (state) =>
  selectLogin(state).validationErrors.filter(
    ({ path }) =>
      path.length == 2 && path[0] === "user" && path[1] === "password"
  )[0]?.message;

export const selectRecaptchaTokenError = (state) =>
  selectLogin(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "recaptchaToken"
  )[0]?.message;
