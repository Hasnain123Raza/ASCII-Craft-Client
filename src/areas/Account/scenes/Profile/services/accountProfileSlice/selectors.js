export const selectProfile = (state) => state.account.profile;

export const selectProfileData = (state) => selectProfile(state).profileData;

export const selectId = (state) => selectProfileData(state)._id;

export const selectUsername = (state) => selectProfileData(state).username;

export const selectTotalArtsCreated = (state) =>
  selectProfileData(state).totalArtsCreated;

export const selectRecentSimplifiedArts = (state) =>
  selectProfileData(state).recentSimplifiedArts;

export const selectRecentSimplifiedArtByIndex = (index) => (state) =>
  selectRecentSimplifiedArts(state)[index];

export const selectRecentSimplifiedArtIdByIndex = (index) => (state) =>
  selectRecentSimplifiedArtByIndex(index)(state)._id;

export const selectRecentSimplifiedArtTitleByIndex = (index) => (state) =>
  selectRecentSimplifiedArtByIndex(index)(state).title;

export const selectRecentSimplifiedArtDescriptionByIndex = (index) => (state) =>
  selectRecentSimplifiedArtByIndex(index)(state).description;

export const selectGetProfileRequestStatus = (state) =>
  selectProfile(state).getProfileRequestStatus;
