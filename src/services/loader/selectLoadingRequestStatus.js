import { selectGetAuthenticatedRequestStatus } from "../authenticatedSlice/selectors.js";

export default function selectLoadingRequestStatus(state) {
  const getAuthenticatedRequestStatus =
    selectGetAuthenticatedRequestStatus(state);

  return getAuthenticatedRequestStatus;
}
