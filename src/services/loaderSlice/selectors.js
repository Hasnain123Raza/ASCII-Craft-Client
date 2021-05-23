export const selectLoader = (state) => state.loader;

export const selectHasLoaded = (state) => selectLoader(state).hasLoaded;

export const selectLoadResourcesRequestStatus = (state) =>
  selectLoader(state).loadResourcesRequestStatus;
