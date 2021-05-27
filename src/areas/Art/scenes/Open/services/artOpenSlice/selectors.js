export const selectOpen = (state) => state.art.open;

export const selectArt = (state) => selectOpen(state).art;

export const selectCreatorId = (state) => selectArt(state).creatorId;

export const selectTitle = (state) => selectArt(state).title;

export const selectDescription = (state) => selectArt(state).description;

export const selectContent = (state) => selectArt(state).content;

export const selectGetArtRequestStatus = (state) =>
  selectOpen(state).getArtRequestStatus;

export const selectGetDeleteArtRequestStatus = (state) =>
  selectOpen(state).getDeleteArtRequestStatus;
