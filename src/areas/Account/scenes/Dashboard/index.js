import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getEmailVerification,
  getLogout,
  reset,
} from "./services/accountDashboardSlice";
import {
  selectGetEmailVerificationRequestStatus,
  selectGetLogoutRequestStatus,
  selectAlertError,
} from "./services/accountDashboardSlice/selectors.js";

import {
  selectUsername,
  selectEmail,
  selectRank,
} from "../../../../services/authenticatedSlice/selectors";

import { Badge, Alert } from "react-bootstrap";
import EmailVerificationButton from "./components/EmailVerificationButton";
import PostRequestButton from "../../../../components/PostRequestButton";

export default function Dashboard() {
  const dispatch = useDispatch();

  const username = useSelector(selectUsername);
  const email = useSelector(selectEmail);
  const rank = useSelector(selectRank);
  const alertError = useSelector(selectAlertError);

  const initiateGetEmailVerification = () => {
    dispatch(getEmailVerification());
  };
  const getEmailVerificationRequestStatus = useSelector(
    selectGetEmailVerificationRequestStatus
  );

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
        {Boolean(alertError) && <Alert variant="danger">{alertError}</Alert>}
        <h6 className="d-inline">Username: </h6> {username} <br />
        <h6 className="d-inline">Email: </h6>
        {email}{" "}
        {rank === "unverified" && <Badge variant="danger">Not Verified</Badge>}
        <br />
        <h6 className="d-inline">Rank: </h6> {rank} <br />
        <div className="mt-2">
          {rank === "unverified" && (
            <EmailVerificationButton
              className="mr-2"
              initiateLoadingRequest={initiateGetEmailVerification}
              loadingRequestStatus={getEmailVerificationRequestStatus}
            />
          )}
          <PostRequestButton
            initiateLoadingRequest={initiateLoadingRequest}
            loadingRequestStatus={loadingRequestStatus}
            idleText="Logout"
            idleVariant="primary"
            redirectLink="/authentication/login"
          />
        </div>
      </div>
    </div>
  );
}
