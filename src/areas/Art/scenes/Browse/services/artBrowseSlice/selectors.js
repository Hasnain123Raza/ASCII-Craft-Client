export const selectBrowse = (state) => state.art.browse;

export const selectArtCount = (state) => selectBrowse(state).artCount;

export const selectGetArtCountRequestStatus = (state) =>
  selectBrowse(state).getArtCountRequestStatus;

export const selectSimplifiedArts = (state) =>
  selectBrowse(state).simplifiedArts;

export const selectSimplifiedArtByIndex = (index) => (state) =>
  selectSimplifiedArts(state)[index];

export const selectSimplifiedArtTitleByIndex = (index) => (state) =>
  selectSimplifiedArtByIndex(index)(state).title;

export const selectSimplifiedArtDescriptionByIndex = (index) => (state) =>
  selectSimplifiedArtByIndex(index)(state).description;

export const selectGetSimplifiedArtsRequestStatus = (state) =>
  selectBrowse(state).getSimplifiedArtsRequestStatus;

export const selectCurrentPage = (state) => selectBrowse(state).currentPage;
