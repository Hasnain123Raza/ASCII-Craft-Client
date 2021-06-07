import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  reset,
  getEmailVerification,
} from "./services/authenticationEmailVerificationSlice";
import { selectGetEmailVerificationRequestStatus } from "./services/authenticationEmailVerificationSlice/selectors.js";

import { getAuthenticated } from "../../../../services/authenticatedSlice";
import { selectIsAuthenticated } from "../../../../services/authenticatedSlice/selectors.js";

import { setAlert } from "../../../../components/AlertSystem/services/alertSystemSlice";
import { selectAlert } from "../../../../components/AlertSystem/services/alertSystemSlice/selectors.js";

import GetRequestCard from "../../../../components/GetRequestCard";
import { Button } from "react-bootstrap";

export default function EmailVerification() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();

  const alert = useSelector(selectAlert);
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
      <h2 style={{ textAlign: "center" }}>Email Verification</h2>
      <hr />
      <div>
        {(!Boolean(alert) || alert.variant !== "danger") && (
          <GetRequestCard
            initiateLoadingRequest={initiateLoadingRequest}
            loadingRequestStatus={loadingRequestStatus}
            fulfilledComponent={() => {
              dispatch(
                setAlert({
                  variant: "success",
                  message:
                    "Your email has been successfully verified and your rank has been updated!",
                })
              );
              return <></>;
            }}
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
