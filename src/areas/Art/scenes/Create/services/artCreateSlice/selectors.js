export const selectCreate = (state) => state.art.create;

export const selectArt = (state) => selectCreate(state).art;

export const selectTitle = (state) => selectArt(state).title;

export const selectDescription = (state) => selectArt(state).description;

export const selectContent = (state) => selectArt(state).content;

export const selectPostCreateArtRequestStatus = (state) =>
  selectCreate(state).postCreateArtRequestStatus;

export const selectTitleError = (state) =>
  selectCreate(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "title"
  )[0]?.message;

export const selectDescriptionError = (state) =>
  selectCreate(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "description"
  )[0]?.message;

export const selectContentError = (state) =>
  selectCreate(state).validationErrors.filter(
    ({ path }) => path.length == 1 && path[0] === "content"
  )[0]?.message;
