export const selectBrowse = (state) => state.art.browse;

export const selectArtCount = (state) => selectBrowse(state).artCount;

export const selectGetArtCountRequestStatus = (state) =>
  selectBrowse(state).getArtCountRequestStatus;

export const selectSimplifiedArts = (state) =>
  selectBrowse(state).simplifiedArts;

export const selectSimplifiedArtByIndex = (index) => (state) =>
  selectSimplifiedArts(state)[index];

export const selectSimplifiedArtIdByIndex = (index) => (state) =>
  selectSimplifiedArtByIndex(index)(state)._id;

export const selectSimplifiedArtTitleByIndex = (index) => (state) =>
  selectSimplifiedArtByIndex(index)(state).title;

export const selectSimplifiedArtDescriptionByIndex = (index) => (state) =>
  selectSimplifiedArtByIndex(index)(state).description;

export const selectGetSimplifiedArtsRequestStatus = (state) =>
  selectBrowse(state).getSimplifiedArtsRequestStatus;

export const selectLoadingRequestStatus = (state) => {
  const getArtCountRequestStatus = selectGetArtCountRequestStatus(state);
  const getSimplifiedArtsRequestStatus =
    selectGetSimplifiedArtsRequestStatus(state);
  return getArtCountRequestStatus === "rejected" ||
    getSimplifiedArtsRequestStatus === "rejected"
    ? "rejected"
    : getArtCountRequestStatus === "fulfilled" &&
      getSimplifiedArtsRequestStatus === "fulfilled"
    ? "fulfilled"
    : "pending";
};

export const selectCurrentPage = (state) => selectBrowse(state).currentPage;
