export const selectProfile = (state) => state.account.profile;

export const selectProfileData = (state) => selectProfile(state).profileData;

export const selectId = (state) => selectProfileData(state)._id;

export const selectUsername = (state) => selectProfileData(state).username;

export const selectTotalArtsCreated = (state) =>
  selectProfileData(state).totalArtsCreated;

export const selectCreatedArts = (state) =>
  selectProfileData(state).createdArts;

export const selectTotalArtsLiked = (state) =>
  selectProfileData(state).totalArtsLiked;

export const selectLikedArts = (state) => selectProfileData(state).likedArts;

export const selectGetProfileRequestStatus = (state) =>
  selectProfile(state).getProfileRequestStatus;
