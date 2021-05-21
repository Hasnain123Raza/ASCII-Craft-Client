export const selectLogin = (state) => state.authentication.login;

export const selectUsername = (state) => selectLogin(state).username;

export const selectPassword = (state) => selectLogin(state).password;

export const selectPostLoginUserRequestStatus = (state) =>
  selectLogin(state).postLoginUserRequestStatus;

export const selectUsernameError = (state) =>
  selectLogin(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "username"
  )[0]?.message;

export const selectPasswordError = (state) =>
  selectLogin(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "password"
  )[0]?.message;
