import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLogout, reset } from "./services/accountDashboardSlice";
import { selectGetLogoutRequestStatus } from "./services/accountDashboardSlice/selectors.js";

import { selectUsername } from "../../../../services/authenticatedSlice/selectors";

import PostRequestButton from "../../../../components/PostRequestButton";

export default function () {
  const dispatch = useDispatch();

  const username = useSelector(selectUsername);

  const initiateLoadingRequest = () => dispatch(getLogout());
  const loadingRequestStatus = useSelector(selectGetLogoutRequestStatus);

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  return (
    <div className="account-dashboard d-flex flex-column" style={{ flex: 1 }}>
      <div>
        <h2 style={{ textAlign: "center" }}>Welcome {username}!</h2>
        <hr />

        <PostRequestButton
          initiateLoadingRequest={initiateLoadingRequest}
          loadingRequestStatus={loadingRequestStatus}
          idleText="Logout"
          redirectLink="/authentication/login"
        />
      </div>
    </div>
  );
}
