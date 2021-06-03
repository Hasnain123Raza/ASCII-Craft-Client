import { getAuthenticated } from "../authenticatedSlice";

export default function initiateLoadingRequest(dispatch) {
  return () => {
    dispatch(getAuthenticated());
  };
}
