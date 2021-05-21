export const selectRegister = (state) => state.authentication.register;

export const selectUsername = (state) => selectRegister(state).username;

export const selectPassword = (state) => selectRegister(state).password;

export const selectPostRegisterUserRequestStatus = (state) =>
  selectRegister(state).postRegisterUserRequestStatus;

export const selectUsernameError = (state) =>
  selectRegister(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "username"
  )[0]?.message;

export const selectPasswordError = (state) =>
  selectRegister(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "password"
  )[0]?.message;
