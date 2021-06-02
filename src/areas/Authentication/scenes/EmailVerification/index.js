import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  reset,
  getEmailVerification,
} from "./services/authenticationEmailVerificationSlice";
import {
  selectGetEmailVerificationRequestStatus,
  selectAlertError,
} from "./services/authenticationEmailVerificationSlice/selectors.js";

import { getAuthenticated } from "../../../../services/authenticatedSlice";
import { selectIsAuthenticated } from "../../../../services/authenticatedSlice/selectors.js";

import GetRequestCard from "../../../../components/GetRequestCard";
import { Button, Alert } from "react-bootstrap";

export default function EmailVerification() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();

  const alertError = useSelector(selectAlertError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const initiateLoadingRequest = () => dispatch(getEmailVerification(token));
  const loadingRequestStatus = useSelector(
    selectGetEmailVerificationRequestStatus
  );

  useEffect(() => {
    initiateLoadingRequest();
    return () => dispatch(reset());
  }, []);

  return (
    <div
      className="authentication-emailVerification d-flex flex-column"
      style={{ flex: 1 }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>Email Verification</h2>
        <hr />
        {Boolean(alertError) && <Alert variant="danger">{alertError}</Alert>}

        {!Boolean(alertError) && (
          <GetRequestCard
            initiateLoadingRequest={initiateLoadingRequest}
            loadingRequestStatus={loadingRequestStatus}
            fulfilledComponent={() => (
              <Alert variant="success">
                Your email has been successfully verified and your rank has been
                updated!
              </Alert>
            )}
          />
        )}

        {isAuthenticated ? (
          <Button
            onClick={() => {
              dispatch(getAuthenticated());
              history.push("/account/dashboard");
            }}
            className="mt-2"
            variant="success"
          >
            Dashboard
          </Button>
        ) : (
          <Button
            onClick={() => {
              history.push("/authentication/login");
            }}
            className="mt-2"
            variant="success"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}
