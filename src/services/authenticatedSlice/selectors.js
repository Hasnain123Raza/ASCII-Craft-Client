export const selectAuthenticated = (state) => state.authenticated;

export const selectIsAuthenticated = (state) =>
  selectAuthenticated(state).isAuthenticated;

export const selectUser = (state) => selectAuthenticated(state).user;

export const selectUserId = (state) => selectUser(state)?._id;

export const selectUsername = (state) => selectUser(state)?.username;

export const selectEmail = (state) => selectUser(state)?.email;

export const selectRank = (state) => selectUser(state)?.rank;

export const selectGetAuthenticatedRequestStatus = (state) =>
  selectAuthenticated(state).getAuthenticatedRequestStatus;
